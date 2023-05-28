import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  loggedin:any;
  male:boolean = false;
  users:User[]=[];
    constructor(private usersService: UserService,private actRoute:ActivatedRoute) { }
  
    ngOnInit(): void {
      
      this.users=this.usersService.getUsers();
      const email=this.actRoute.snapshot.params['email'];
      this.loggedin=this.users.find(u => u.email===email);

    
      if(this.loggedin.gender == "female")
          this.male = false;
          else
          this.male = true;
    }
    login(email:string,pass:string){
      for(let user of this.users)
      if(user.email==email && user.password == pass){
      localStorage.setItem('user',email);
      if(this.loggedin.user == true)
      localStorage.setItem('user',email);
      
    }
  
  }
}