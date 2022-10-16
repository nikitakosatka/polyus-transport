import { Component, Inject } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRole } from '../auth.service';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css'],
})
export class EditOrderDialogComponent {
  order?: Order;
  role: UserRole;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { order: Order; role: UserRole }
  ) {
    this.order = data.order;
    this.role = data.role;
  }

  edit() {
    if (!this.order) {
      return;
    }
    this.ordersService.edit(this.order).subscribe(() => {
      window.location.reload();
    });
  }

  close() {
    this.dialogRef.close();
  }

  onOrderUpdate(order: Order) {
    this.order = order;
  }
}
