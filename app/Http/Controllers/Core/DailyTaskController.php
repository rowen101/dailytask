<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use App\Models\Core\DailyTask;
use Illuminate\Http\Request;

class DailyTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("core.dailytask");
    }

    public function listdailytask()
    {
        $db = DailyTask::all();
        return response()->json($db, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $db = new DailyTask;
        $request->validate([
            'user_id' => 'required',
            'week' => 'required',
            'site' => 'required',
            'ticket' => 'required',
            'type' => 'required',
            'subject' => 'required',
            'raisedby' => 'required',
            // 'position' => 'required',
            'department' => 'required',
            'days' => 'required',
            'hitmiss' => 'required',
            'status' => 'required',
            'sla' => 'required',
            'remarks' => 'required'
        ]);
        $db->user_id = auth()->user()->id;
        $db->store($request->all());
        return response()->json($db, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
