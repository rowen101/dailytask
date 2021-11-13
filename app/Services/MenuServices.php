<?php


namespace App\Services;


use App\Models\Core\Menu;
use App\Models\Core\Permission;


class MenuServices
{
    private $menu;
    private $permission;

    public function __construct()
    {
        $this->menu = new Menu();
        $this->permission = new Permission();
    }

    public function store($request,$id){
        $data =  Menu::find($id);
        $request->validate([
            'app_id' => 'required',
            'menu_code' => 'required',
            'menu_title' => 'required',
            'description' => 'required',

        ]);
        $data->store($request->all());
    }

    public function storePermission($permissions){
        foreach ($permissions as $permi ){

        }
    }


}
