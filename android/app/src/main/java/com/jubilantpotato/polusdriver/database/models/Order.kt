package com.jubilantpotato.polusdriver.database.models

import androidx.room.*
import com.google.gson.annotations.SerializedName
import java.util.*

@Entity(tableName = "orders")
data class Order(
    @PrimaryKey
    @ColumnInfo(name = "id")
    @SerializedName("id")
    val id: UUID,

    @ColumnInfo(name = "rate")
    @SerializedName("rate")
    val rate: String,

    @ColumnInfo(name = "title")
    @SerializedName("title")
    val title: String,

    @ColumnInfo(name = "description")
    @SerializedName("body")
    val description: String,

    @ColumnInfo(name = "customer_id")
    @SerializedName("customer_id")
    val customerId: UUID,

    @ColumnInfo(name = "driver_id")
    @SerializedName("driver_id")
    var driverId: UUID?,

    @ColumnInfo(name = "create_date")
    @SerializedName("created_at")
    val createdDate: Date,

    @ColumnInfo(name = "start_date")
    @SerializedName("todo_at")
    val startDate: Date,

    @ColumnInfo(name = "finish_date")
    @SerializedName("finish_at")
    val finishDate: Date,

    @ColumnInfo(name = "transport_type_id")
    @SerializedName("transport_type_id")
    val transportTypeId: UUID,

    @ColumnInfo(name = "address")
    @SerializedName("address")
    val address: String,

    @ColumnInfo(name = "status")
    @SerializedName("status")
    var status: OrderStatus,
)
