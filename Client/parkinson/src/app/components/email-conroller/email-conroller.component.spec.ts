import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EmailConrollerComponent } from "./email-conroller.component";

describe("EmailConrollerComponent", () => {
  let component: EmailConrollerComponent;
  let fixture: ComponentFixture<EmailConrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailConrollerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
