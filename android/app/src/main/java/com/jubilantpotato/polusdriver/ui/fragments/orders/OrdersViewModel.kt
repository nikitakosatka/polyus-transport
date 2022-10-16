package com.jubilantpotato.polusdriver.ui.fragments.orders

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import com.jubilantpotato.polusdriver.database.Repository
import com.jubilantpotato.polusdriver.database.models.Order

class OrdersViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = Repository.getInstance(application.applicationContext)

    fun getNewOrders(): LiveData<List<Order>> = repository.getNewOrders()

    fun takeOrder(order: Order): LiveData<Boolean> = repository.takeOrder(order)

    fun updateNewLocalOrders() = repository.updateNewLocalOrders()
}