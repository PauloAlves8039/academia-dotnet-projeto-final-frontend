/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermanenciaService } from './permanencia.service';

describe('Service: Permanencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermanenciaService]
    });
  });

  it('should ...', inject([PermanenciaService], (service: PermanenciaService) => {
    expect(service).toBeTruthy();
  }));
});
