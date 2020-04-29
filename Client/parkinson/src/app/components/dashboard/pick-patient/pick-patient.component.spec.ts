import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPatientComponent } from './pick-patient.component';

describe('PickPatientComponent', () => {
  let component: PickPatientComponent;
  let fixture: ComponentFixture<PickPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
