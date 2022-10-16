package com.jubilantpotato.polusdriver.database

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.database.models.OrderStatus
import com.jubilantpotato.polusdriver.database.room.OrderDatabase
import com.jubilantpotato.polusdriver.retrofit.DriverRemoteData
import com.jubilantpotato.polusdriver.retrofit.RetrofitBuilder
import com.jubilantpotato.polusdriver.utils.Preferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*

class Repository private constructor(context: Context) {

    companion object {
        private var INSTANCE: Repository? = null

        fun getInstance(context: Context): Repository = INSTANCE ?: Repository(context)
    }

    private val remoteData = DriverRemoteData(RetrofitBuilder.api)
    private val preferences = Preferences(context)
    private val db = OrderDatabase.getInstance(context)
    private val dbDao = db.orderDao()

    fun getMyOrders() = dbDao.findByDriverId(preferences.getDriver().id)

    fun getNewOrders() = dbDao.newOrders(preferences.getDriver().id, OrderStatus.TODO.ordinal)

    fun updateMyLocalOrders(): LiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()
        remoteData.getOrdersByDriverId(preferences.getDriver().id)
            .enqueue(object : Callback<List<Order>> {
                override fun onResponse(call: Call<List<Order>>, response: Response<List<Order>>) {
                    if (response.isSuccessful && response.body() != null) {
                        dbDao.deleteUnavailable(
                            preferences.getDriver().id,
                            OrderStatus.DONE.ordinal
                        )
                        dbDao.insert(response.body()!!)
                        liveData.value = true
                    } else
                        liveData.value = false
                }

                override fun onFailure(call: Call<List<Order>>, t: Throwable) {
                    t.printStackTrace()
                    liveData.value = false
                }
            })
        return liveData
    }

    fun updateNewLocalOrders(): LiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()
        remoteData.getOrdersByStatus(OrderStatus.TODO, preferences.getDriver().transportTypeId)
            .enqueue(object : Callback<List<Order>> {
                override fun onResponse(call: Call<List<Order>>, response: Response<List<Order>>) {
                    if (response.isSuccessful && response.body() != null) {
                        dbDao.deleteUnavailable(
                            preferences.getDriver().id,
                            OrderStatus.DONE.ordinal
                        )
                        dbDao.insert(response.body()!!)
                        liveData.value = true
                    } else
                        liveData.value = false
                }

                override fun onFailure(call: Call<List<Order>>, t: Throwable) {
                    t.printStackTrace()
                    liveData.value = false
                }
            })
        return liveData
    }

    fun updateDriver(driver: Driver): LiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()
        remoteData.updateDriver(driver.id, driver).enqueue(object : Callback<String> {
            override fun onResponse(call: Call<String>, response: Response<String>) {
                liveData.value = response.isSuccessful
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                t.printStackTrace()
                liveData.value = false
            }
        })
        return liveData
    }

    fun finishOrder(order: Order): LiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()
        remoteData.updateOrder(order.id, order.apply { status = OrderStatus.DONE })
            .enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    liveData.value = response.isSuccessful
                    if (response.isSuccessful)
                        dbDao.delete(order)
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                    t.printStackTrace()
                    liveData.value = false
                }
            })
        return liveData
    }

    fun takeOrder(order: Order): LiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()
        remoteData.updateOrder(order.id, order.apply {
            status = OrderStatus.IN_PROCESS
            driverId = preferences.getDriver().id
        })
            .enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    liveData.value = response.isSuccessful
                    if (response.isSuccessful)
                        dbDao.insert(order)
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                    t.printStackTrace()
                    liveData.value = false
                }
            })
        return liveData
    }
}