package com.jubilantpotato.polusdriver.database.models

import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

data class Transport(
    @SerializedName("id") val id: Int,
    @SerializedName("name") val name: String,
    @SerializedName("status") var status: TransportStatus
)
