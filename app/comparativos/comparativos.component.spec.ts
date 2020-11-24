import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativosComponent } from './comparativos.component';

describe('ComparativosComponent', () => {
  let component: ComparativosComponent;
  let fixture: ComponentFixture<ComparativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
