import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrComponent } from 'src/app/alerts/dialog-err/dialog-err.component';
import { Router } from '@angular/router';

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
    private dialog: MatDialog,
    private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  submit() {
    this.showSpinner = true;
    console.log(this.formLogin.value);
    this.userService.login(this.formLogin.value)
    .subscribe((resp)=>{
      this.showSpinner = false;
      let token = JSON.stringify(resp.token);
      token = token.slice(1);
      token = token.slice(0, -1);
      localStorage.setItem('token', token);
      localStorage.setItem('usrlog', JSON.stringify(resp));
      this.userService.loginOk();
      this.router.navigateByUrl('/pages/page1');
    },
    (err)=>{
      this.showSpinner = false;
      this.dialog.open(DialogErrComponent);
      //console.log(err);
    })
  }

}
