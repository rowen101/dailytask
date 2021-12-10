<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MainModel;

class DailyTask extends MainModel
{
    protected $table = 'core_daily_tasks';
    protected $fillable = [
        'user_id', 'week', 'site', 'district', 'ticket', 'type', 'subject', 'raisedby', 'position', 'department', 'days', 'hitmiss', 'status', 'sla', 'remarks', 'publish'
    ];
}
