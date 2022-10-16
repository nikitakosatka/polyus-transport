package com.jubilantpotato.polusdriver.database.room

import androidx.room.TypeConverter
import com.jubilantpotato.polusdriver.database.models.OrderStatus
import java.util.*

class Converters {
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? {
        return value?.let { Date(it) }
    }

    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? {
        return date?.time?.toLong()
    }

    @TypeConverter
    fun toInt(orderStatus: OrderStatus): Int = orderStatus.ordinal

    @TypeConverter
    fun fromInt(int: Int): OrderStatus = OrderStatus.values()[int]
}