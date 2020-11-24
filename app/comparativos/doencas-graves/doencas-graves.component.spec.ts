import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencasGravesComponent } from './doencas-graves.component';

describe('DoencasGravesComponent', () => {
  let component: DoencasGravesComponent;
  let fixture: ComponentFixture<DoencasGravesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencasGravesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoencasGravesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
