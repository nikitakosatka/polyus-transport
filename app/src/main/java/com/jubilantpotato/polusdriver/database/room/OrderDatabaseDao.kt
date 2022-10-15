package com.jubilantpotato.polusdriver.database.room

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.Order

@Dao
interface OrderDatabaseDao {
    @Insert
    fun insert(order: Order)

    @Query("SELECT * FROM orders WHERE id LIKE :id")
    fun findById(id: Int): Order?
}