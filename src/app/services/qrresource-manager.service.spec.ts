import { TestBed } from '@angular/core/testing';

import { QRResourceManagerService } from './qrresource-manager.service';

describe('QRResourceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QRResourceManagerService = TestBed.get(QRResourceManagerService);
    expect(service).toBeTruthy();
  });
});
