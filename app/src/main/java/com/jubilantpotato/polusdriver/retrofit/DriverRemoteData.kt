package com.jubilantpotato.polusdriver.retrofit

import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.database.models.OrderStatus
import retrofit2.Call
import java.util.*

class DriverRemoteData(private val driverAPI: DriverAPI) {
    fun getOrdersByDriverId(driverId: UUID): Call<List<Order>> = driverAPI.getOrdersByDriverId(driverId)
    fun getOrdersByStatus(status: OrderStatus, transport_id: UUID): Call<List<Order>> = driverAPI.getOrdersByStatus(transport_id, status)
    fun updateOrder(orderId: UUID, order: Order): Call<String> = driverAPI.updateOrder(orderId, order)
    fun updateDriver(driverId: UUID, driver: Driver): Call<String> = driverAPI.updateDriver(driverId, driver)
}