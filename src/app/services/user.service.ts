import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
users:User[]=[
/* new User("antwan","antwan@gmail.com","1234","02/08/2000","male"),
  new User("maroon","maroon@gmail.com","1234","02/08/2000","male"),
  new User("moran","moran@gmail.com","1234","3/3/2004","female"),*/
];
user:any;

  constructor(private http: HttpClient) { }
  refreshUser(){
    this.http.get<any>("http://localhost:3000/users")
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