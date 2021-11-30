<?php

use Database\Seeders\core\CoreDatabaseSeeder;
use Database\Seeders\CoreSeed;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid', 50)->index()->nullable();
            $table->integer('user_id')->unsigned();
            $table->string('week', 20);
            $table->string('site', 20);
            $table->string('district', 20);
            $table->integer('ticket')->default();
            $table->string('type', 20);
            $table->string('subject', 150);
            $table->string('raisedby', 20);
            $table->string('position', 20)->nullable();
            $table->string('department', 20)->nullable();
            $table->integer('days')->default(100);
            $table->boolean('hitmiss')->default(false);
            $table->boolean('status')->default(false);
            $table->boolean('sla')->default(false);
            $table->string('remarks', 150)->nullable();
            $table->boolean('publish')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_tasks');
    }
}
