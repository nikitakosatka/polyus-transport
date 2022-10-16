package com.jubilantpotato.polusdriver.ui.activities

import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import androidx.security.crypto.MasterKeys
import com.google.android.material.textfield.TextInputEditText
import com.jubilantpotato.polusdriver.R
import com.jubilantpotato.polusdriver.database.Repository
import com.jubilantpotato.polusdriver.database.models.Driver
import com.jubilantpotato.polusdriver.database.models.ResponseLogin
import com.jubilantpotato.polusdriver.retrofit.RetrofitBuilder
import com.jubilantpotato.polusdriver.utils.NetworkChecker
import com.jubilantpotato.polusdriver.utils.Preferences
import kotlinx.coroutines.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.coroutines.CoroutineContext

class LoginActivity : AppCompatActivity() {

    private lateinit var preferences: Preferences
    private lateinit var masterKey: MasterKey
    private lateinit var encryptedSharedPreferences: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        masterKey = MasterKey.Builder(this, MasterKey.DEFAULT_MASTER_KEY_ALIAS)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        encryptedSharedPreferences = EncryptedSharedPreferences.create(
            this,
            ENCRYPTED_SHARED_PREFERENCES,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
        preferences = Preferences(this)
        val networkChecker = NetworkChecker(this)

        val email = findViewById<TextInputEditText>(R.id.loginEmailField)
        val password = findViewById<TextInputEditText>(R.id.loginPasswordField)
        val login = findViewById<Button>(R.id.loginButton)

        if (networkChecker.isOnline() && preferences.isLogged()) {
            login(preferences.getDriver().email, encryptedSharedPreferences.getString(PASSWORD_KEY, "") ?: "")
        } else if (preferences.isLogged()) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        login.setOnClickListener { login(email.text.toString(), password.text.toString()) }
    }

    private fun login(email: String, password: String) {
        RetrofitBuilder.api.auth(email, password).enqueue(object : Callback<ResponseLogin> {
            override fun onResponse(
                call: Call<ResponseLogin>,
                response: Response<ResponseLogin>
            ) {
                if (response.isSuccessful) {
                    val driverId = response.body()?.id
                    if (driverId == null) {
                        loginError()
                        return
                    }
                    RetrofitBuilder.api.getDriverById(driverId).enqueue(object : Callback<Driver> {
                        override fun onResponse(call: Call<Driver>, response: Response<Driver>) {
                            if (response.isSuccessful) {
                                val driver = response.body()
                                if (driver == null) {
                                    loginError()
                                    return
                                }
                                preferences.setDriver(driver)
                                preferences.setLogged(true)
                                with(encryptedSharedPreferences.edit()) {
                                    putString(PASSWORD_KEY, password)
                                    apply()
                                }
                                startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                finish()
                            } else
                                loginError()
                        }

                        override fun onFailure(call: Call<Driver>, t: Throwable) = loginError(t)
                    })
                } else
                    loginError()
            }

            override fun onFailure(call: Call<ResponseLogin>, t: Throwable) = loginError(t)
        })
    }

    private fun loginError(t: Throwable = SecurityException()) {
        with(encryptedSharedPreferences.edit()) {
            remove(PASSWORD_KEY)
            apply()
        }
        preferences.setLogged(false)
        Toast.makeText(this@LoginActivity, "Ошибка авторизации", Toast.LENGTH_SHORT).show()
        t.printStackTrace()
    }

    companion object {
        private const val ENCRYPTED_SHARED_PREFERENCES = "ENCRYPTED_SHARED_PREFERENCES"
        private const val PASSWORD_KEY = "DRIVER_PASSWORD_KEY"
    }
}