import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternasComponent } from './externas.component';

describe('ExternasComponent', () => {
  let component: ExternasComponent;
  let fixture: ComponentFixture<ExternasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
