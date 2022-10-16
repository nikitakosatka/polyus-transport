package com.jubilantpotato.polusdriver.database.models

import com.google.gson.annotations.SerializedName
import java.util.*

data class Transport(
    @SerializedName("id") val id: UUID,
    @SerializedName("transport_type_id") val typeId: UUID,
    @SerializedName("status") var status: TransportStatus
)
