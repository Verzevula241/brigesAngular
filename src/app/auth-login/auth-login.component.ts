import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  private baseUrl = "http://ng-test.dmsoft.ru"

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  public loginInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) {



     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  submit() {
    if (this.loginForm.valid) {
      async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        return await response.json();
      }
      postData(this.baseUrl+'/api/account/token', { login: this.f.login.value ,password: this.f.password.value })
        .then(res => {
          if(res){
            console.log(res);
            localStorage.setItem('token',res.token)
            this.router.navigate(['/chat'], { relativeTo: this.route });
            
          }
        });
    }
  }

 test(){
  fetch('http://ng-test.dmsoft.ru/api/test/close',{
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      'Authorization': "Bearer " + localStorage["token"], 
    }), 
  }).then(res =>{
    localStorage.removeItem("token");
  })
 }

}
