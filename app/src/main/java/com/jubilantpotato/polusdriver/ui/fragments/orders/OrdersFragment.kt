package com.jubilantpotato.polusdriver.ui.fragments.orders

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.databinding.FragmentOrdersBinding
import com.jubilantpotato.polusdriver.ui.adapters.OrderAdapter
import com.jubilantpotato.polusdriver.ui.fragments.home.HomeViewModel

class OrdersFragment : Fragment() {

    private var _binding: FragmentOrdersBinding? = null

    private val binding get() = _binding!!

    private lateinit var ordersViewModel: OrdersViewModel
    private lateinit var adapter: OrderAdapter
    private lateinit var newOrders: LiveData<List<Order>>

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        ordersViewModel = ViewModelProvider(
            this,
            ViewModelProvider.AndroidViewModelFactory.getInstance(requireActivity().application)
        )[OrdersViewModel::class.java]

        _binding = FragmentOrdersBinding.inflate(inflater, container, false)
        val root: View = binding.root

        adapter = OrderAdapter(requireContext())
        binding.newOrdersView.adapter = adapter
        binding.newOrdersView.layoutManager = LinearLayoutManager(requireContext())

        newOrders = ordersViewModel.getNewOrders()
        newOrders.observe(viewLifecycleOwner) {
            Log.d("ANBQAWSHH", it.size.toString())
            adapter.submitList(it)
        }

        binding.orderSwipeRefresh.setOnRefreshListener { loadOrders() }

        loadOrders()

        return root
    }

    private fun loadOrders() {
        ordersViewModel.updateNewLocalOrders().observe(viewLifecycleOwner) { success ->
            if (!success)
                Toast.makeText(requireContext(), "Не удалось загрузить новые заказы", Toast.LENGTH_SHORT).show()
            binding.orderSwipeRefresh.isRefreshing = false
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        newOrders.removeObservers(viewLifecycleOwner)
        _binding = null
    }
}