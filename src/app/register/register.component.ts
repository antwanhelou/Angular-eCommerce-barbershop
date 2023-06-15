import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform!:FormGroup;

  constructor(private service:UserService , private router : Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }
  createRegisterForm(){
    this.registerform = new FormGroup(
      {
        name : new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required]),
        password2 : new FormControl('',[Validators.required]),
        birth: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required])
      }
    );
  }
  signUp(){
      this.http.post<any>("http://localhost:8000/users/add", this.registerform.value)
      .subscribe(res=>{
        alert("Signup Successfull");
        this.registerform.reset();
        this.router.navigate(['profile/login'])
      })
    }
  onSubmit(){

    if(!this.service.isexists(this.registerform.value.email)){

      if(this.registerform.value.password != this.registerform.value.password2)
        alert("passowrd not the same!")
      else{
        this.http.post<any>("http://localhost:8000/users/add", this.registerform.value)
        .subscribe(res=>{
          alert("Signup Successfull");
          this.registerform.reset();
          this.router.navigate(['profile/login'])
        })

    }

    }
    else{
      alert("user exists")
    }
  }
}
