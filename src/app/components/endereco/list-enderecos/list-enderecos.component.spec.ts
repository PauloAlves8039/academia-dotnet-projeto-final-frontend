/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListEnderecosComponent } from './list-enderecos.component';

describe('ListEnderecosComponent', () => {
  let component: ListEnderecosComponent;
  let fixture: ComponentFixture<ListEnderecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnderecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
