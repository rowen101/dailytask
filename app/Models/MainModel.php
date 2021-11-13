<?php

namespace App\Models;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Support\Str;


class MainModel extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;


    protected $guarded = ['id', 'uuid'];
    protected $tableTransactionColumns = array();

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (Schema::hasColumn($model->getTable(), 'uuid')) {
                $model->uuid = (string)Str::uuid();
            }
            if (Schema::hasColumn($model->getTable(), 'created_by')) {
                $model->created_by = Auth::id() ? Auth::id() : 1;
            }
        });
        static::updating(function ($model) {
            if (Schema::hasColumn($model->getTable(), 'updated_by')) {
                $model->updated_by = Auth::id() ? Auth::id() : $model->updated_by;
            }
        });
        static::retrieved(function ($model) {
            $result = DB::select("SHOW COLUMNS FROM " . $model->getTable() . "");
            foreach ($result as $key => $value) {
                if (($model[$value->Field] != "0000-00-00 00:00:00") && ($model[$value->Field] != "")) {
                    if (strtolower($value->Type) == 'timestamp' || strtolower($value->Type) == 'datetime') {
                        $dateTime = explode(' ', $model[$value->Field]);
                        $datePart = explode('-', $dateTime[0]);
                        $hourPart = explode(':', $dateTime[1]);
                        $model[$value->Field] = Carbon::create($datePart[0], $datePart[1], $datePart[2], $hourPart[0], $hourPart[1], $hourPart[2], date_default_timezone_get());
                    }
                }
            }
            return $model;
        });
    }

    //Get Record By ID
    public function getByID(int $id)
    {
        return $this->find($id);
    }

    //Get Record By UUID
    public function getByUUID(string $uuid)
    {
        return $this::where('uuid', $uuid)->get();
    }

    //Get all Records
    public function getAllRecords()
    {
        return $this::all();
    }

    //Get PaginatedRecords
    public function getPaginatedRecords(int $recordsPerPage = 15)
    {
        return $this::paginate($recordsPerPage);
    }

    /**
     * requires $tableTransactionColumns protected variable to be declared on the calling child class
     * this is function will only be called for data validation based on the table transaction Columns
     * @return array
     * @throws Exception
     * @var array, $strict =  force validation against all columns marked as 1
     *                     = true, when validating a new record which means the key or id = empty or is not set
     * array values will contain table column as key and a value of 1 when required and 0 if not required
     *
     */
    public function validateTransactionColumns(array $dataAttributes, $strict = false)
    {
        if (!$dataAttributes) {
            return array('status' => FAILURE, 'result' => "Invalid Passed Parameter. Data passed for saving must be an Array.");
        }
        if (isset($this->tableTransactionColumns) && $this->tableTransactionColumns) {
            foreach ($this->tableTransactionColumns as $key => $value) {
                if (array_key_exists($key, $dataAttributes)) {
                    if ($value && (!isset($dataAttributes[$key]) || trim($dataAttributes[$key]) === '')) {
                        throw new Exception($key . " must contain a valid value for saving!",-1);
                    }
                } elseif ($value && $strict) {
                    throw new Exception($key . " must be passed with a valid value for saving!",-1);
                }
            }
            if ($strict) {
                foreach ($dataAttributes as $key => $value) {
                    if (!array_key_exists($key, $this->tableTransactionColumns) && $key <> $this->getKeyName() && $value) {
                        throw new Exception($key . " not found from the list of valid table transaction columns!",-1);
                    }
                }
            }
        }
    }

    //saving the record : expecting a single record transaction
    public function store(array $dataAttributes)
    {
        $recordID = 0;
        //we ensure that the attribute being passed only contain a single record data for saving
        foreach ($dataAttributes as $key => $el) {
            if (is_array($el)) {
                abort(403, $this->getMorphClass() . ' : Passed attribute must be a single record transaction');
            }
            break;
        }

        if (array_key_exists($this->getKeyName(), $dataAttributes)) {
            $recordID = $dataAttributes[$this->getKeyName()];
        }
        if ($recordID) {
            $result = $this->find($recordID);
            if ($result) {
                $result->update($dataAttributes);
            } else {
                $result = $this->create($dataAttributes);
            }
        } else {
            $result = $this->create($dataAttributes);
        }
        return $result;
    }

    /** attributes may contain 1 to multiple records
     * Parameter for Saving can be
     * An array of records for single record saving
     * An array of multiple records for saving
     *    @@param array $attributes = [] or array([],[])
     */
    public function storeData(array $dataAttributes)//: ?array
    {
        //this will set the validation $strict parameter to true you passed a new record for saving
        $result = $this->validateTransactionColumns($dataAttributes, (!array_key_exists($this->getKeyName(), $dataAttributes) ? true : !$dataAttributes[$this->getKeyName()]));

        //return if attributes is invalid
        if (!$dataAttributes || count($dataAttributes) == 0 || !is_array($dataAttributes)) return null;

        //we check if  the attribute being passed contain a single or multiple record of data for saving
        $isMultiple = array_key_exists(0, $dataAttributes) ? is_array($dataAttributes[0]) : false; //saving multiple records

        //saving data
        if ($isMultiple) {
            foreach ($dataAttributes as $data) {
                $result[] = $this->store($data);
            }
        } else {
            $result = $this->store($dataAttributes);
        }

        return $result;
    }

    /* Deleting a record
    * parameter
     * $recordID : array of ID or a single ID for deleting
     * $autocommit : default to TRUE, store will not issue Begin transaction
    */
    public function deleteRecord($recordID, $autocommit = TRUE)
    {
        $responses = array("status" => FAILURE, "result" => "Invalid parameter ID");
        if ($recordID) {
            if (!$autocommit) { //Issue begin transaction
                DB::beginTransaction();
            }
            try {
                if (is_array($recordID)) { // Multiple records passed for saving
                    $responses['result'] = array();
                    foreach ($recordID as $key => $id) {
                        $result = $this->find($id);
                        if ($result && $result->delete()) {
                            $responses['result'][] = 'Record ID ' . $id . ($autocommit ? ' has been successfully deleted.' : ' OK for deletion.');
                        } else {
                            $responses['status'] = FAILURE;
                            $responses['result'][] = 'Record ID ' . $id . ' not found!';
                        }
                    }
                } else { // single record is being passed for saving
                    $result = $this->find($recordID);
                    if ($result && $result->delete()) {
                        $responses['result'] = 'Record ID ' . $recordID . ' has been successfully deleted.';
                    } else {
                        $responses['status'] = FAILURE;
                        $responses['result'] = 'Record ID ' . $recordID . ' not found!';
                    }
                }
            } catch (\Exception $e) {
                $responses['status'] = FAILURE;
                $responses['result'] = $e->getMessage();
            }
            if (!$autocommit) { //Issue begin transaction
                if ($responses['status'] == SUCCESS) {
                    DB::commit();
                } else {
                    DB::rollBack();
                }
            }
        }
        return $responses;
    }

    //Search record from an array of fields to search
    public function searchRecord(array $fieldsArray, $searchValue)
    {
        $result = $this->Where(function ($q) use ($fieldsArray, $searchValue) {
            $q->orWhere($fieldsArray[0], 'LIKE', '%' . $searchValue . '%');
            for ($i = 1; $i < count($fieldsArray); $i++) {
                $q->orWhere($fieldsArray[$i], 'LIKE', '%' . $searchValue . '%');
            }
        });
        return $result;
    }

    /**
     * This function will set the value of validField arrays of the model which will be used for validating passed data attributes before saving
     * @var array
     */
    public function setTableTransactionColumns(array $tableColumns)
    {
        if (!isset($this->tableTransactionColumns)) {
            abort(403, get_called_class() . ' : ' . 'Table Transaction Columns needs to be declared from the child repository!');
        } else {
            $this->tableTransactionColumns = $tableColumns;
        }
    }

    /**
     * This function will get the value of validField arrays of the model which will be used for validating passed data attributes before saving
     * @return  array
     */
    public function getTableTransactionColumns()
    {
        if (!isset($this->tableTransactionColumns)) {
            abort(403, get_called_class() . ' : ' . 'Table Transaction Columns needs to be declared from the child repository!');
        }
        return $this->tableTransactionColumns;
    }

}
