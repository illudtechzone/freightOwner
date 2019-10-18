import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedDataComponent } from './quoted-data.component';

describe('QuotedDataComponent', () => {
  let component: QuotedDataComponent;
  let fixture: ComponentFixture<QuotedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotedDataComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
