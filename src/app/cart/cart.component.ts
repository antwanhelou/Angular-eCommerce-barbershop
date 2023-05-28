import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { ThisReceiver } from '@angular/compiler';
import { CartProduct } from '../model/cart';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../model/product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartform!:FormGroup;
  totalprice:number=this.cartService.gettotalprice();
  products :CartProduct []= [];
  items = this.cartService.getProducts();
  product=this.productService.getproducts();
  loggedin:any;
  users:User[]=[];
  constructor(private cartService : CartService,private productService : ProductsService,private router: Router,private usersService: UserService,private actRoute:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    
    
    this.products = this.cartService.getProducts()
    this.users=this.usersService.getUsers();
    const email=this.actRoute.snapshot.params['email'];
    this.loggedin=this.users.find(u => u.email===email);
    
  }
  getproducts(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
    
  getcart():Observable<any>{
    return this.http.get<any>("http://localhost:3000/cart")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  checkOut(){
    this.cartService.makePayment()
    this.clearCart();
   }
  clearCart() {
    this.cartService.clearCart();
    this.items = this.cartService.getProducts();
    this.totalprice = 0;
  }
  deletefromcart(product: CartProduct){
    this.cartService.removeCartItem(product);
    this.totalprice-=product.product.price*product.qty;
}
QuantityUp(product:CartProduct){
  this.cartService.QuantityUp(product);
  this.totalprice+= product.product.price ;
 
}
QuantityDown(product:CartProduct){
if(product.qty==1){
  this.deletefromcart(product);
  return;
}
this.cartService.QuantityDown(product);
this.totalprice-= product.product.price ;
}


}