package com.jubilantpotato.polusdriver.database.models

import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import com.jubilantpotato.polusdriver.database.models.Transport
import java.util.*

data class TransportType(
    @SerializedName("id") val id: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("transports") val transports: List<Transport>
)