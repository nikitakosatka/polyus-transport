package com.jubilantpotato.polusdriver.database.models

import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import com.jubilantpotato.polusdriver.database.models.Transport

data class TransportType(
    @SerializedName("id") val id: Int,
    @SerializedName("name") val name: String,
    @SerializedName("transports") val transports: List<Transport>
)