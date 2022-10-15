import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class JsonKeysToCamelCaseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
        if (isJsonResponseEvent(event)) {
          const bodyObj = JSON.parse(event.body);
          return event.clone({ body: JSON.stringify(keysToCamel(bodyObj)) });
        }
        return event;
      })
    );
  }
}

function isJsonResponseEvent(
  event: HttpEvent<unknown>
): event is HttpResponse<unknown> {
  return (
    event instanceof HttpResponse &&
    event.headers.get('Content-Type') === 'application/json'
  );
}

function toCamel(s: string) {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

function keysToCamel(o: any): any {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n = {} as { [key: string]: any };
    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });
    return n;
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return keysToCamel(i);
    });
  }
  return o;
}
