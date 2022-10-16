package com.jubilantpotato.polusdriver.ui.activities

import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.jubilantpotato.polusdriver.R
import com.jubilantpotato.polusdriver.database.Repository
import com.jubilantpotato.polusdriver.databinding.ActivityMainBinding
import com.jubilantpotato.polusdriver.utils.Preferences
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var preferences: Preferences

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            super.onAvailable(network)
            if (!preferences.isUpdateWasRecently())
                Repository.getInstance(applicationContext).updateMyLocalOrders()
                    .observe(this@MainActivity) { success ->
                        if (success)
                            preferences.setLastUpdateDate()
                    }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        preferences = Preferences(this)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)

        navView.setupWithNavController(navController)

        val networkRequest = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
            .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
            .build()
        val connectivityManager =
            getSystemService(ConnectivityManager::class.java) as ConnectivityManager
        connectivityManager.requestNetwork(networkRequest, networkCallback)

        Repository.getInstance(applicationContext).updateMyLocalOrders().observe(this) { success ->
            if (success)
                preferences.setLastUpdateDate()
        }
    }
}