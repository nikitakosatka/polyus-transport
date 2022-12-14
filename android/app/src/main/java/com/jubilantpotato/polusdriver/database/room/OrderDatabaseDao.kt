package com.jubilantpotato.polusdriver.database.room

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy.REPLACE
import androidx.room.Query
import com.jubilantpotato.polusdriver.database.models.Order
import java.util.*

@Dao
interface OrderDatabaseDao {
    @Insert (onConflict = REPLACE)
    fun insert(order: Order)

    @Insert (onConflict = REPLACE)
    fun insert(orders: List<Order>)

    @Delete
    fun delete(order: Order)

    @Delete
    fun delete(orders: List<Order>)

    @Query("DELETE FROM orders WHERE driver_id != :driverId OR status = :orderStatus")
    fun deleteUnavailable(driverId: UUID, orderStatus: Int)

    @Query("SELECT * FROM orders WHERE driver_id = :id")
    fun findByDriverId(id: UUID): LiveData<List<Order>>

    @Query("SELECT * FROM orders WHERE status = :orderStatus AND transport_type_id = :transportTypeId")
    fun newOrders(orderStatus: Int, transportTypeId: UUID): LiveData<List<Order>>
}