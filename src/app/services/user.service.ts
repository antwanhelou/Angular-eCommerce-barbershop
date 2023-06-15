import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
users:User[]=[

];
user:any;

  constructor(private http: HttpClient) { }
  refreshUser(){
    this.http.get<any>("http://127.0.0.1:8000/users/")
    .subscribe(data=>{
     this.users=data;});

     return this.users;
  }
    getUsers(){
      this.user = this.refreshUser();
      return this.user
  }
 

  isValid(email:string , password:string)
  {
    this.refreshUser()
    for(let user of this.users){
      if(email == user.email && password == user.password){
        localStorage.setItem('user',email)
        return true
      
      }
      
    }
    return false
  }

  isexists(email:string){
    for(let user of this.users){
      if(email == user.email)
        return true
    }
    return false
  }
  adduser(name:string,email :string,pass:string,birth:string,gender:string){
    let user=new User (name,email,pass,birth,gender)
    this.users.push(user)
  }
}