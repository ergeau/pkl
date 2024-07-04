<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->increments('idSkor'); // Menggunakan increments untuk primary key
            $table->string('skor');
            $table->unsignedInteger('user_id'); // Menambahkan kolom user_id sebagai foreign key
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Membuat foreign key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
