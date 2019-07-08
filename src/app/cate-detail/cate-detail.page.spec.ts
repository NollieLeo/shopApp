import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateDetailPage } from './cate-detail.page';

describe('CateDetailPage', () => {
  let component: CateDetailPage;
  let fixture: ComponentFixture<CateDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
