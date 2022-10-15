package com.jubilantpotato.polusdriver.database.models

import com.google.gson.annotations.SerializedName

data class Driver(
    @SerializedName("id") val id: Int,
    @SerializedName("name") val name: String
)
