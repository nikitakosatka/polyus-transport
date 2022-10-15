import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css'],
})
export class CreateOrderDialogComponent implements OnInit {
  private order?: Order;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly dialogRef: MatDialogRef<CreateOrderDialogComponent>
  ) {}

  ngOnInit(): void {}

  create() {
    if (!this.order) {
      return;
    }
    this.ordersService.create(this.order);
  }

  close() {
    this.dialogRef.close();
  }
}
