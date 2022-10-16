package com.jubilantpotato.polusdriver.utils

import android.content.Context
import com.google.gson.Gson
import com.jubilantpotato.polusdriver.database.models.Driver
import java.util.*


class Preferences(
    context: Context
) {
    companion object {
        private const val SHARED_PREFERENCES = "SHARED_PREFERENCES"
        private const val LOGGED_KEY = "IS_LOGGED_KEY"
        private const val LAST_DRIVER_KEY = "LAST_DRIVER_KEY"
        private const val LAST_UPDATE_KEY = "LAST_UPDATE_KEY"
        private const val FIFTEEN_MINUTES_IN_MILLIS = 900000
    }

    private val sharedPreferences =
        context.getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE)

    fun isLogged(): Boolean {
        return sharedPreferences.getBoolean(LOGGED_KEY, false)
    }

    fun setLogged(isLogged: Boolean) {
        with(sharedPreferences.edit()) {
            putBoolean(LOGGED_KEY, isLogged)
            apply()
        }
    }

    fun getDriver(): Driver {
        return Gson().fromJson(sharedPreferences.getString(LAST_DRIVER_KEY, "{}"), Driver::class.java)
    }

    fun setDriver(driver: Driver) {
        with(sharedPreferences.edit()) {
            putString(LAST_DRIVER_KEY, Gson().toJson(driver))
            apply()
        }
    }

    fun getLastUpdateDate(): Date {
        return Date(sharedPreferences.getLong(LAST_UPDATE_KEY, Calendar.getInstance().timeInMillis))
    }

    fun setLastUpdateDate() {
        with(sharedPreferences.edit()) {
            putLong(LAST_UPDATE_KEY, Calendar.getInstance().timeInMillis)
            apply()
        }
    }

    fun isUpdateWasRecently(): Boolean {
        val currentDate = Calendar.getInstance()
        val updateDate = Calendar.getInstance()
        updateDate.time = getLastUpdateDate()
        return (currentDate.timeInMillis - updateDate.timeInMillis) < FIFTEEN_MINUTES_IN_MILLIS
    }
}