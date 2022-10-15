package com.jubilantpotato.polusdriver.ui.fragments.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
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

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val homeViewModel = ViewModelProvider(this)[HomeViewModel::class.java]
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        preferences = Preferences(requireContext())
        networkChecker = NetworkChecker(requireContext())
        binding.driver = preferences.getDriver()

        adapter = OrderAdapter(requireContext())
        binding.myOrdersView.adapter = adapter
        binding.myOrdersView.layoutManager = LinearLayoutManager(requireContext())

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}