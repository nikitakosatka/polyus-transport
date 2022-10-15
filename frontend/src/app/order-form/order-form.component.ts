import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from '../models/order';
import { TransportTypesService } from '../transport-types.service';
import { TransportType } from '../models/transport-type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Output() readonly orderChange = new EventEmitter<Order>();

  readonly formGroup = new FormGroup({
    title: new FormControl(),
    body: new FormControl(),
    todoAt: new FormControl(),
    finishAt: new FormControl(),
    transportTypeId: new FormControl(),
    address: new FormControl(),
  });

  get selectedTransportType(): TransportType | null {
    if (!this.formGroup.value.transportTypeId) {
      return null;
    }
    return this.transportTypes.find(
      t => t.id === this.formGroup.value.transportTypeId
    )!;
  }

  public transportTypes: TransportType[] = [];

  constructor(private readonly transportTypesService: TransportTypesService) {
    this.transportTypesService.get().subscribe(transportTypes => {
      this.transportTypes = transportTypes;
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.orderChange.emit(this.makeOrder());
    });
  }

  private makeOrder(): Order {
    const v = this.formGroup.value;
    return new Order(
      v.title,
      v.body,
      new Date(),
      v.todoAt,
      v.finishAt,
      this.selectedTransportType!,
      v.address
    );
  }

  ngOnInit(): void {}
}
