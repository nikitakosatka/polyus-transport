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
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      body: transformKeys(request.body, toSnake),
    });
    return next.handle(newRequest).pipe(
      map(event => {
        if (isJsonResponseEvent(event)) {
          return event.clone({ body: transformKeys(event.body, toCamel) });
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

function toSnake(s: string) {
  return s
    .replace(/\w([A-Z])/g, m => {
      return m[0] + '_' + m[1];
    })
    .toLowerCase();
}

function transformKeys(o: any, transformer: (s: string) => string): any {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n = {} as { [key: string]: any };
    Object.keys(o).forEach(k => {
      n[transformer(k)] = transformKeys(o[k], transformer);
    });
    return n;
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return transformKeys(i, transformer);
    });
  }
  return o;
}
