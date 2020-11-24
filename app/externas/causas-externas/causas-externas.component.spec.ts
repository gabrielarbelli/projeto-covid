import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasExternasComponent } from './causas-externas.component';

describe('CausasExternasComponent', () => {
  let component: CausasExternasComponent;
  let fixture: ComponentFixture<CausasExternasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CausasExternasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
