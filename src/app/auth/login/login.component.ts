import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

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


  constructor(private fb: FormBuilder, private userService: UserService){}

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
    },
    (err)=>{
      this.showSpinner = false;
      console.log(err);
    })
  }

}
