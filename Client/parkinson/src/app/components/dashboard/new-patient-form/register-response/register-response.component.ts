import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/shared/services/Patient';

@Component({
  selector: 'app-register-response',
  templateUrl: './register-response.component.html',
  styleUrls: ['./register-response.component.scss']
})
export class RegisterResponseComponent implements OnInit {

  response: Patient;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set patient(response: Patient) {
    this.response = response;
  }

}
