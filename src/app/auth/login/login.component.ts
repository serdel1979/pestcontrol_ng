import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/alerts/dialog-err/dialog-err.component';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showSpinner: boolean = false;

  formLogin: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private alertDialogService: AlertService){}

  ngOnInit(): void {
   
  }



  submit() {
    this.showSpinner = true;
    const loginSubscription = this.userService.login(this.formLogin.value)
      .subscribe(
        (resp) => {
          this.showSpinner = false;
          let token = JSON.stringify(resp.token);
          token = token.slice(1);
          token = token.slice(0, -1);
          localStorage.setItem('token', token);
          localStorage.setItem('usrlog', JSON.stringify(resp));
          this.userService.loginOk();
          this.router.navigateByUrl('/clients/allclients');
        }
        ,
        (err) => {
          this.showSpinner = false;
          if (err.status === 400) {
            this.alertDialogService.openAlertDialog('Usuario o contraseña incorrecto');
          } else {
            // Otro tipo de error (error de red u otro)
            this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
          }
        }
      );
  
    setTimeout(() => {
      if (!loginSubscription.closed) {
        loginSubscription.unsubscribe();
        this.alertDialogService.openAlertDialog('Tiempo de espera agotado. Por favor, inténtalo de nuevo más tarde.');
        this.showSpinner = false;
      }
    }, 10000); // 10 segundos de tiempo de espera
  }
  

}
