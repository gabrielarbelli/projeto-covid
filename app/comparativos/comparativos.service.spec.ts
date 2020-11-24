import { TestBed } from '@angular/core/testing';

import { ComparativosService } from './comparativos.service';

describe('ComparativosService', () => {
  let service: ComparativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
