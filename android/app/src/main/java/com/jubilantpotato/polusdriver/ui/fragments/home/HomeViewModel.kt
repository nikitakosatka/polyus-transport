package com.jubilantpotato.polusdriver.ui.fragments.home

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.jubilantpotato.polusdriver.database.Repository
import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.Order
import java.util.*

class HomeViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = Repository.getInstance(application.applicationContext)

    fun getMyOrders(): LiveData<List<Order>> = repository.getMyOrders()

    fun updateDriver(driver: Driver): LiveData<Boolean> = repository.updateDriver(driver)
}