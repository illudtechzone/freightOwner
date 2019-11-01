import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverPage } from './assign-driver.page';

describe('AssignDriverPage', () => {
  let component: AssignDriverPage;
  let fixture: ComponentFixture<AssignDriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
