import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponsedata, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isloginMode = true;
  isLoading = false;
  // localStorage= localStorage.setItem('token
  error: any = null;
  constructor(private _authService: AuthService, private _router:Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponsedata>;

    this.isLoading = true;
    if (this.isloginMode) {
      authObs= this._authService.login(email,password)
    } else {
      authObs= this._authService.signUp(email, password)
    }

    authObs.subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this._router.navigate(['/recipe'])

        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    form.reset();
  }
}
