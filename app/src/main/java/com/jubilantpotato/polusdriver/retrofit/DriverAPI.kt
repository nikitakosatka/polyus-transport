package com.jubilantpotato.polusdriver.retrofit

import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.database.models.OrderStatus
import com.jubilantpotato.polusdriver.database.models.ResponseLogin
import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*
import java.util.*

interface DriverAPI {

    @FormUrlEncoded
    @POST("/api/auth/driver/login")
    fun auth(@Field("username") username: String, @Field("password") password: String): Call<ResponseLogin>

    @Headers("Content-Type: application/json")
    @GET("/api/driver/{id}")
    fun getDriverById(@Path("id") id: UUID): Call<Driver>

    @Headers("Content-Type: application/json")
    @GET("/api/order/by_driver_id/{id}")
    fun getOrdersByDriverId(@Path("id") driverId: UUID): Call<List<Order>>

    @Headers("Content-Type: application/json")
    @GET("/api/order/by_status/{transport_type_id}")
    fun getOrdersByStatus(@Path("transport_type_id") transport_id: UUID, @Query("status") status: OrderStatus): Call<List<Order>>

    @Headers("Content-Type: application/json")
    @PUT("/api/order/{id}")
    fun updateOrder(@Path("id") orderId: UUID, @Body order: Order): Call<String>

    @Headers("Content-Type: application/json")
    @PUT("/api/driver/{id}")
    fun updateDriver(@Path("id") driverId: UUID, @Body driver: Driver): Call<String>
}