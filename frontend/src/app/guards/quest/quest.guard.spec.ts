import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { questGuard } from './quest.guard';

describe('questGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => questGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
