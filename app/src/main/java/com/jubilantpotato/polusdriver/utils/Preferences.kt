package com.jubilantpotato.polusdriver.utils

import android.content.Context
import com.google.gson.Gson
import com.jubilantpotato.polusdriver.database.models.Driver

class Preferences(
    private val context: Context
) {
    companion object {
        private const val SHARED_PREFERENCES_KEY = "SHARED_PREFERENCES_KEY"
        private const val LOGGED_KEY = "IS_LOGGED_KEY"
        private const val LAST_DRIVER_KEY = "LAST_DRIVER_KEY"
    }

    private val sharedPreference =
        context.getSharedPreferences(SHARED_PREFERENCES_KEY, Context.MODE_PRIVATE)

    fun isLogged(): Boolean {
        return sharedPreference.getBoolean(LOGGED_KEY, false)
    }

    fun setLogged(isLogged: Boolean) {
        with(sharedPreference.edit()) {
            putBoolean(LOGGED_KEY, isLogged)
            apply()
        }
    }

    fun getDriver(): Driver {
        return Gson().fromJson(sharedPreference.getString(LAST_DRIVER_KEY, "{}"), Driver::class.java)
    }

    fun setDriver(driver: Driver) {
        with(sharedPreference.edit()) {
            putString(LAST_DRIVER_KEY, Gson().toJson(driver))
            apply()
        }
    }
}