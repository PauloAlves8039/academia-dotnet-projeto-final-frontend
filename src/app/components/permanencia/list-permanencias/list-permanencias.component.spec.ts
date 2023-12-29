/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPermanenciasComponent } from './list-permanencias.component';

describe('ListPermanenciasComponent', () => {
  let component: ListPermanenciasComponent;
  let fixture: ComponentFixture<ListPermanenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPermanenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPermanenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
