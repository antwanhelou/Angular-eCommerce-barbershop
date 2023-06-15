import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  users:User[]=[]
  loginForm !: FormGroup;
  constructor(private service:UserService,private router:Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.users=this.service.getUsers();
    this.createloginform();
  }
  refreshUser(){
    this.http.get<any>("http://localhost:8000/users")
    .subscribe(data=>{
     this.users=data;});
  }
onsubmit(){
  
  if (this.service.isValid(this.loginForm.value.email,this.loginForm.value.password))
  {
    
   this.router.navigate(['/profile/userdetails',this.loginForm.value.email]);
  }
 
}
login(){
  
      this.refreshUser()
      for(let a=0;a<this.users.length;a++){
        if(this.users[a].email==this.loginForm.value.email && this.users[a].password==this.loginForm.value.password){
          alert("Login Success!!");
          localStorage.setItem("user", this.loginForm.value.email);
          this.router.navigate(['/profile/userdetails',this.loginForm.value.email]);
          this.loginForm.reset();
        }
  
      }
    }
  
createloginform(){
  this.loginForm = new FormGroup(
    {
    email : new FormControl('' ,[Validators.required]),
     password : new FormControl('' , [Validators.required])
  });
}
}

