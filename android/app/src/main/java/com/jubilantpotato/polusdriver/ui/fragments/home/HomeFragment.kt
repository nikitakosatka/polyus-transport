package com.jubilantpotato.polusdriver.ui.fragments.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.jubilantpotato.polusdriver.database.models.DriverStatus
import com.jubilantpotato.polusdriver.database.models.Order
import com.jubilantpotato.polusdriver.databinding.FragmentHomeBinding
import com.jubilantpotato.polusdriver.ui.adapters.OrderAdapter
import com.jubilantpotato.polusdriver.utils.NetworkChecker
import com.jubilantpotato.polusdriver.utils.Preferences

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    private val binding get() = _binding!!

    private lateinit var preferences: Preferences
    private lateinit var networkChecker: NetworkChecker
    private lateinit var adapter: OrderAdapter
    private lateinit var myOrders: LiveData<List<Order>>

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val homeViewModel = ViewModelProvider(
            this,
            ViewModelProvider.AndroidViewModelFactory.getInstance(requireActivity().application)
        )[HomeViewModel::class.java]
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        preferences = Preferences(requireContext())
        networkChecker = NetworkChecker(requireContext())
        binding.driver = preferences.getDriver()

        adapter = OrderAdapter(requireContext())
        binding.myOrdersView.adapter = adapter
        binding.myOrdersView.layoutManager = LinearLayoutManager(requireContext())

        if (preferences.getDriver().status == DriverStatus.WORKING)
            binding.workSwitch.isChecked = true

        binding.workSwitch.setOnClickListener { l ->
            run {
                if (networkChecker.isOnline()) {
                    homeViewModel.updateDriver(preferences.getDriver().apply {
                        status = when (binding.workSwitch.isChecked) {
                            true -> DriverStatus.WORKING
                            false -> DriverStatus.AVAILABLE
                        }
                    }).observe(viewLifecycleOwner) { success ->
                        run {
                            if (!success) {
                                binding.workSwitch.isChecked = !binding.workSwitch.isChecked
                                Toast.makeText(
                                    requireContext(),
                                    "Не удалось изменить статус работы, попробуйте позже",
                                    Toast.LENGTH_LONG
                                ).show()
                            } else {
                                preferences.setDriver(preferences.getDriver().apply {
                                    status = when (binding.workSwitch.isChecked) {
                                        true -> DriverStatus.WORKING
                                        false -> DriverStatus.AVAILABLE
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }

        myOrders = homeViewModel.getMyOrders()
        myOrders.observe(viewLifecycleOwner) { adapter.submitList(it) }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        myOrders.removeObservers(viewLifecycleOwner)
        _binding = null
    }
}