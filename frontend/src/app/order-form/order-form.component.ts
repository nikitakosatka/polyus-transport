import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order, OrderUrgency } from '../models/order';
import { TransportTypesService } from '../transport-types.service';
import { TransportType } from '../models/transport-type';
import { YaMapComponent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements AfterViewInit {
  @ViewChild(YaMapComponent) readonly mapRef?: YaMapComponent;

  public selectedAddressCoords?: [number, number];

  @Output() readonly orderChange = new EventEmitter<Order>();

  readonly formGroup = new FormGroup({
    title: new FormControl(),
    body: new FormControl(),
    todoAt: new FormControl(),
    finishAt: new FormControl(),
    transportTypeId: new FormControl(),
    address: new FormControl(),
    urgency: new FormControl(OrderUrgency.Normal),
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

  ngAfterViewInit() {
    this.mapRef?.map$.subscribe(map => {
      map?.controls.remove('trafficControl');
    });
  }

  private makeOrder(): Order {
    const v = this.formGroup.value;
    const coords = this.selectedAddressCoords?.join(';')!;
    return new Order(
      null,
      v.title,
      v.body,
      new Date(),
      v.todoAt,
      v.finishAt,
      this.selectedTransportType!,
      coords,
      v.urgency!
    );
  }

  onMapClick(event: ymaps.Event) {
    this.selectedAddressCoords = event.get('coords');
    this.orderChange.emit(this.makeOrder());
  }
}
