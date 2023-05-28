import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  email:any;
  loggedin:any;
  gender:number =0;
  users:User[]=[];
  public totalItem : number = 0;
  
  public searchTerm !: string;

  constructor(private route:Router , private service:UserService , private actRoute:ActivatedRoute,private cartService : CartService ) { }
  ngOnInit(): void {
    
    this.cartService.getproducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    this.route.events.subscribe((val:any)=>{ 
      {
        if(val.url && localStorage.getItem('user'))
        {
          this.isLogin = true;
          this.email = localStorage.getItem('user')
     
          this.users=this.service.getUsers();
          this.loggedin=this.users.find(u => u.email===this.email);
          
          if(this.loggedin.gender == "male")
            this.gender = 1;
          if(this.loggedin.gender == "female")
            this.gender = 2;
        }

        if(val.url.includes('login'))
       {
        
        this.email = localStorage.removeItem('user')
         this.isLogin=false;
        this.gender = 0;
       }

    } 

    })
    
    
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
