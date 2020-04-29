import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-conroller',
  templateUrl: './email-conroller.component.html',
  styleUrls: ['./email-conroller.component.scss']
})
export class EmailConrollerComponent {

  mode: any;
  code: any;

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mode = params.mode;
      this.code = params.oobCode;
    });

    switch (this.mode) {
      case 'resetPassword':
        this.router.navigate(['new-password', this.code]);

        break;
      case 'verifyEmail':
        this.router.navigate(['verify-email-address', this.code]);
        break;
      default:
      // Error: invalid mode.
    }
  }
}
