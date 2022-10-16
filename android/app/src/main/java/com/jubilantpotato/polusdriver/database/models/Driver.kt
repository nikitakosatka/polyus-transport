package com.jubilantpotato.polusdriver.database.models

import com.google.gson.annotations.SerializedName
import java.util.*

data class Driver(
    @SerializedName("id") val id: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("email") val email: String,
    @SerializedName("status") var status: DriverStatus,
    @SerializedName("transport_type_id") val transportTypeId: UUID
)
