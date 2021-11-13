<?php

namespace App\Models\Core;

use App\Models\MainModel;

class Menu extends MainModel
{
    protected $table = 'core_menu';

    public function permissions()
    {
        return $this->hasMany(Permission::class, 'menu_id', 'id');
    }

    public function menus()
    {
        return $this->hasMany(Menu::class, 'app_id' , 'id');
    }

    protected $fillable = [
        'id',
        'uuid',
        'app_id',
        'menu_code',
        'menu_title',
        'description',
        'parent_id',
        'menu_icon',
        'menu_route',
        'sort_order',
        'is_active',
        'created_by',
        'update_by'
    ];
}
