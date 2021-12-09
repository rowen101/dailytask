<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MainModel;

class Options extends MainModel
{
    //use HasFactory;

    protected $table = "core_options";
    protected $fillable = ['soptiontype', 'name', 'status'];
}
