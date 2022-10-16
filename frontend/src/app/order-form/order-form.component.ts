import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order, OrderUrgency } from '../models/order';
import { TransportTypesService } from '../transport-types.service';
import { TransportType } from '../models/transport-type';
import { YaMapComponent } from 'angular8-yandex-maps';
import { AuthService, UserRole } from '../auth.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit, AfterViewInit {
  @ViewChild(YaMapComponent) readonly mapRef?: YaMapComponent;

  public selectedAddressCoords?: [number, number];

  @Input() order?: Order;
  @Input() role = UserRole.Customer;
  @Output() readonly orderChange = new EventEmitter<Order>();

  readonly formGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    body: new FormControl(),
    todoAt: new FormControl(),
    createdAt: new FormControl(new Date()),
    finishAt: new FormControl(),
    transportTypeId: new FormControl(),
    address: new FormControl(),
    urgency: new FormControl(OrderUrgency.Normal),
    customerId: new FormControl(this.authService.userId),
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

  constructor(
    private readonly transportTypesService: TransportTypesService,
    private readonly authService: AuthService
  ) {
    this.transportTypesService.get().subscribe(transportTypes => {
      this.transportTypes = transportTypes;
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.orderChange.emit(this.makeOrder());
    });
  }

  ngOnInit(): void {
    if (this.order) {
      this.formGroup.setValue({
        id: this.order.id,
        title: this.order.title,
        body: this.order.body,
        todoAt: this.order.todoAt,
        createdAt: this.order.createdAt,
        finishAt: this.order.finishAt,
        transportTypeId: this.order.transportType.id,
        address: this.order.address,
        urgency: this.order.urgency,
        customerId: this.order.customerId,
      });
      this.selectedAddressCoords = this.order.address
        .split(';')
        .map(Number) as [number, number];
    }
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
      v.id,
      v.title,
      v.body,
      v.createdAt ?? new Date(),
      v.todoAt,
      v.finishAt,
      this.selectedTransportType!,
      coords,
      v.urgency!,
      v.customerId ?? this.authService.userId!
    );
  }

  onMapClick(event: ymaps.Event) {
    this.selectedAddressCoords = event.get('coords');
    this.orderChange.emit(this.makeOrder());
  }
}
