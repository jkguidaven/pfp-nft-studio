import { TestBed } from '@angular/core/testing';

import { ThemeColorManagerService } from './theme-color-manager.service';

describe('ThemeColorManagerService', () => {
  let service: ThemeColorManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeColorManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
