import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  code: string = "Code";
  match: boolean = true;
  success: boolean = false;


  constructor(
    public _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['oobCode'];
    });
  }

  ngOnInit() {
    this.match = true;

    if(this.code == ""){
      this.router.navigate(['notFound'])
    }
  }

  resetPassword(pass1: string, pass2: string, code: string) {
    this.openSnackBar(code, pass2);
    if (pass1 == pass2) {

      this.match = true;

      this.success = true;

      this.authService.newpass(code, pass2)


    }
    else {

      this.match = false;

      this.success = false;

    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
