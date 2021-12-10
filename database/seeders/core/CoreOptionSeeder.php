<?php

namespace Database\Seeders;

use App\Models\Core\Options;
use Illuminate\Database\Seeder;

class CoreOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $filePath = database_path() . '/seeders/core/CoreOpion.json';
        $str = file_get_contents($filePath);
        $json = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $str), true);
        foreach ($json as $value) {
            $rowdata = new Options();
            $rowdata->id = $value["id"];
            $rowdata->soptiontype = $value["soptiontype"];
            $rowdata->name = $value["name"];
            $rowdata->status = $value["status"];
            $rowdata->save();
        }
    }
}
