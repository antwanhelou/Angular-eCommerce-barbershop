import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private service:UserService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(loginForm:NgForm){
    let mail=loginForm.value.email
    let pass=loginForm.value.pass
    let users=this.service.getUsers()
    for(let user of users){
     if(user.email==mail && user.password==pass){
    alert ("welcome "+ user.name) 
      return
     }
    }
    alert ( "USER NAME OR PASSWORD INCORRECT")
  }

}
