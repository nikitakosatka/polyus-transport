import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../transport.service';
import { TransportTypesService } from '../../transport-types.service';
import { BehaviorSubject, first, map, switchMap } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-transport-page',
  templateUrl: './transport-page.component.html',
  styleUrls: ['./transport-page.component.css'],
})
export class TransportPageComponent implements OnInit {
  transportTypes$ = this.transportTypesService.get();
  transports$ = this.transportService.getAll();
  readonly selectedTransportTypeId$ = new BehaviorSubject<string>('');

  calendarViewDate = new Date();
  readonly selectedTransports$ = this.selectedTransportTypeId$.pipe(
    switchMap(id =>
      this.transports$.pipe(map(t => t.filter(t => t.type.id === id)))
    )
  );

  readonly events$ = this.selectedTransports$.pipe(
    map(transports =>
      transports
        .map(t =>
          t.busyIntervals.map(
            bi =>
              ({
                start: bi.from,
                end: bi.to,
                title: t.plateNumber,
                color: {
                  primary: 'green',
                  secondary: 'lightblue',
                },
              } as CalendarEvent)
          )
        )
        .flat()
    )
  );

  constructor(
    private readonly transportTypesService: TransportTypesService,
    private readonly transportService: TransportService
  ) {
    this.transportTypes$.pipe(first()).subscribe(type => {
      this.selectedTransportTypeId$.next(type[0]?.id ?? '');
    });
  }

  ngOnInit(): void {}
}
