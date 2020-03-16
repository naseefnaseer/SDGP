import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleDivComponent } from './title-div.component';

describe('TitleDivComponent', () => {
  let component: TitleDivComponent;
  let fixture: ComponentFixture<TitleDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
