package com.jubilantpotato.polusdriver.database.models

import com.google.gson.annotations.SerializedName
import java.util.*

data class ResponseLogin(
    @SerializedName("id") val id: UUID,
    @SerializedName("access_token") val token: String
)
