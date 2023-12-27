/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultarCepService } from './consultarCep.service';

describe('Service: ConsultarCep', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultarCepService]
    });
  });

  it('should ...', inject([ConsultarCepService], (service: ConsultarCepService) => {
    expect(service).toBeTruthy();
  }));
});
