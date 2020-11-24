import { TestBed } from '@angular/core/testing';

import { ExternasService } from './externas.service';

describe('ExternasService', () => {
  let service: ExternasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
