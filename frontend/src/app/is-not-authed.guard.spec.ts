import { TestBed } from '@angular/core/testing';

import { IsNotAuthedGuard } from './is-not-authed.guard';

describe('IsNotAuthedGuard', () => {
  let guard: IsNotAuthedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotAuthedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
