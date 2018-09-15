import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewPage } from './add-view.page';

describe('AddViewPage', () => {
  let component: AddViewPage;
  let fixture: ComponentFixture<AddViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
