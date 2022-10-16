package com.jubilantpotato.polusdriver.ui.adapters

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.lifecycle.findViewTreeLifecycleOwner
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.jubilantpotato.polusdriver.R
import com.jubilantpotato.polusdriver.database.Repository
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.database.models.OrderStatus
import com.jubilantpotato.polusdriver.utils.Preferences
import java.util.*
import kotlin.math.abs


class OrderAdapter(private val context: Context) :
    ListAdapter<Order, OrderAdapter.OrderViewHolder>(OrderDiffCallback) {
    private val preferences = Preferences(context)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val itemView =
            LayoutInflater.from(parent.context)
                .inflate(R.layout.order_item, parent, false)
        return OrderViewHolder(itemView, viewType, context)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    override fun getItemViewType(position: Int): Int {
        return if (currentList[position].driverId == preferences.getDriver().id)
            ORDER_TYPE_MY
        else
            ORDER_TYPE_STORED
    }

    class OrderViewHolder(view: View, viewType: Int, private val context: Context) :
        RecyclerView.ViewHolder(view) {
        private val title: TextView = view.findViewById(R.id.orderTitle)
        private val address: TextView = view.findViewById(R.id.orderAddress)
        private val dateStart: TextView = view.findViewById(R.id.orderDateStart)
        private val dateFinish: TextView = view.findViewById(R.id.orderDateFinish)
        private val takeButton: Button = view.findViewById(R.id.orderTake)
        private val hotIcon: ImageView = view.findViewById(R.id.orderHot)

        init {
            if (viewType == ORDER_TYPE_MY)
                takeButton.visibility = View.GONE
        }

        @SuppressLint("SetTextI18n")
        fun bind(order: Order) {
            if (order.driverId == Preferences(context).getDriver().id && order.status == OrderStatus.in_process)
                itemView.setOnLongClickListener {
                    AlertDialog.Builder(context)
                        .setTitle("Вы уверены что хотите завершить данный заказ?")
                        .setMessage("Название заказа: ${order.title}")
                        .setPositiveButton("Да") { d, _ ->
                            Repository.getInstance(context)
                                .finishOrder(order).observe(
                                    it.findViewTreeLifecycleOwner()!!
                                ) { success ->
                                    if (!success) Toast.makeText(
                                        context,
                                        "Не удалось завершить заказ",
                                        Toast.LENGTH_SHORT
                                    ).show()
                                }
                            d.dismiss()
                        }
                        .setNegativeButton("Нет") { d, _ -> d.dismiss() }
                        .create()
                        .show()
                    true
                }
            if (takeButton.visibility != View.GONE)
                takeButton.setOnClickListener {
                    AlertDialog.Builder(context)
                        .setTitle("Вы уверены что хотите взять данный заказ?")
                        .setMessage("Название заказа: ${order.title}")
                        .setPositiveButton("Да") { d, _ ->
                            Repository.getInstance(context)
                                .takeOrder(order).observe(
                                    it.findViewTreeLifecycleOwner()!!
                                ) { success ->
                                    if (!success) Toast.makeText(
                                        context,
                                        "Не удалось взять заказ",
                                        Toast.LENGTH_SHORT
                                    ).show()
                                }
                            d.dismiss()
                        }
                        .setNegativeButton("Нет") { d, _ -> d.dismiss() }
                        .create()
                        .show()
                }
            title.text = order.title
            address.text = order.address
            dateStart.text = "Начало: ${dateToString(order.startDate)}"
            dateFinish.text = "Конец: ${dateToString(order.finishDate)}"
            if (order.rate != HIGH_RATE)
                hotIcon.visibility = View.GONE
        }

        private fun dateToString(startDate: Date): String {
            val current = Calendar.getInstance()
            val time = Calendar.getInstance()
            time.time = startDate
            return if (abs(current[Calendar.DATE] - time[Calendar.DATE]) <= 1)
                when (current[Calendar.DATE] - time[Calendar.DATE]) {
                    -1 -> "Вчера, ${calendarTimeToString(time)}"
                    1 -> "Завтра, ${calendarTimeToString(time)}"
                    else -> "Сегодня, ${calendarTimeToString(time)}"
                }
            else
                "${convertDate(time[Calendar.DATE])} ${getMonth(time)}, ${calendarTimeToString(time)}"
        }

        private fun calendarTimeToString(calendar: Calendar): String {
            return "${convertDate(calendar[Calendar.HOUR_OF_DAY])}:${convertDate(calendar[Calendar.MINUTE])}"
        }

        private fun convertDate(input: Int): String {
            return if (input >= 10) input.toString()
            else "0$input"
        }

        private fun getMonth(time: Calendar): String {
            return when (time[Calendar.MONTH] + 1) {
                1 -> "Января"
                2 -> "Февраля"
                3 -> "Марта"
                4 -> "Апреля"
                5 -> "Мая"
                6 -> "Июня"
                7 -> "Июля"
                8 -> "Августа"
                9 -> "Сентября"
                10 -> "Октября"
                11 -> "Ноября"
                12 -> "Декабря"
                else -> ""
            }
        }

        companion object {
            private const val HIGH_RATE = "HIGH"
        }
    }

    object OrderDiffCallback : DiffUtil.ItemCallback<Order>() {
        override fun areItemsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem == newItem
        }
    }

    companion object {
        private const val ORDER_TYPE_MY = 0
        private const val ORDER_TYPE_STORED = 1
    }
}