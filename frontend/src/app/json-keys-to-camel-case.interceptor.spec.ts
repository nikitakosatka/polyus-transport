import { TestBed } from '@angular/core/testing';

import { JsonKeysToCamelCaseInterceptor } from './json-keys-to-camel-case.interceptor';

describe('JsonKeysToCamelCaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonKeysToCamelCaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonKeysToCamelCaseInterceptor = TestBed.inject(JsonKeysToCamelCaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
