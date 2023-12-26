/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClienteVeiculoService } from './clienteVeiculo.service';

describe('Service: ClienteVeiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteVeiculoService]
    });
  });

  it('should ...', inject([ClienteVeiculoService], (service: ClienteVeiculoService) => {
    expect(service).toBeTruthy();
  }));
});
