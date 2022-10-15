import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderDialogComponent } from '../../create-order-dialog/create-order-dialog.component';
import { OrdersService } from '../../orders.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog,
    private readonly ordersService: OrdersService
  ) {
    ordersService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  openCreateOrderDialog() {
    this.matDialog.open(CreateOrderDialogComponent);
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logout();
    window.location.reload();
  }

  onOrderDelete(order: Order) {
    return this.ordersService.delete(order);
  }
}
