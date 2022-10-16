import { Component, OnInit } from '@angular/core';
import { AuthService, UserRole } from '../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderDialogComponent } from '../../create-order-dialog/create-order-dialog.component';
import { OrdersService } from '../../orders.service';
import { Order } from '../../models/order';
import { map, switchMap } from 'rxjs';
import { EditOrderDialogComponent } from '../../edit-order-dialog/edit-order-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  readonly orders$ = this.authService.role$.pipe(
    switchMap(role =>
      role === UserRole.Customer
        ? this.ordersService.getMine()
        : this.ordersService.getAll()
    )
  );

  private role: UserRole | null = null;

  readonly shouldShowAddOrderButton$ = this.authService.role$.pipe(
    map(role => role === UserRole.Customer)
  );

  constructor(
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog,
    private readonly ordersService: OrdersService
  ) {
    this.authService.role$.subscribe(role => (this.role = role));
  }

  openCreateOrderDialog() {
    this.matDialog.open(CreateOrderDialogComponent);
  }

  ngOnInit(): void {}

  onOrderEdit(order: Order) {
    this.matDialog.open(EditOrderDialogComponent, {
      data: { order, role: this.role },
    });
  }

  onOrderDelete(order: Order) {
    return this.ordersService.delete(order);
  }
}
