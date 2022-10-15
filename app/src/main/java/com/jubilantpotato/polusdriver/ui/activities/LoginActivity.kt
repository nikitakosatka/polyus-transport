package com.jubilantpotato.polusdriver.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.jubilantpotato.polusdriver.R
import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.utils.NetworkChecker
import com.jubilantpotato.polusdriver.utils.Preferences

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val preferences = Preferences(this)
        val networkChecker = NetworkChecker(this)

        preferences.setDriver(Driver(1, "Александр Бинков"))

        if (networkChecker.isOnline()) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        } else if (preferences.isLogged()) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        } else {

        }
    }
}