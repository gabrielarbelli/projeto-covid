import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencasParasitariasComponent } from './doencas-parasitarias.component';

describe('DoencasParasitariasComponent', () => {
  let component: DoencasParasitariasComponent;
  let fixture: ComponentFixture<DoencasParasitariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencasParasitariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoencasParasitariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
