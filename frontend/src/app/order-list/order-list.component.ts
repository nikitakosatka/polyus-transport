import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[] = [];

  constructor() {}

  ngOnInit(): void {}
}
