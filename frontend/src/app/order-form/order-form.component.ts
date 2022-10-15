import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Output() readonly orderUpdate = new EventEmitter<Order>();

  readonly formGroup = new FormGroup({
    title: new FormControl(),
    body: new FormControl(),
    createdAt: new FormControl(),
    todoAt: new FormControl(),
    finishAt: new FormControl(),
    transportTypeId: new FormControl(),
    address: new FormControl(),
  });

  constructor() {
    this.formGroup.valueChanges.subscribe(() => {
      this.orderUpdate.emit();
    });
  }

  ngOnInit(): void {}
}
