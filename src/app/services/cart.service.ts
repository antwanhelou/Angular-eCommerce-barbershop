import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Cart, CartProduct } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL: String='http://localhost:3000/';
  headers={'content-type':'application/json'};
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  private carts: { [userId: string]: Cart } = {};
  mycart=new Cart();
  constructor(private router:Router,private http: HttpClient) { 
 
    this.carts[0]=new Cart();
  }
  getproducts(){
    return this.productList.asObservable();
  }
  
  getcarts(){
    return this.http.get<any>("http://localhost:3000/carts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCurrentUserCart(): Cart {
    const userEmail = localStorage.getItem('user');
    if(userEmail==null){
      return this.carts[0];
    }
    if (!userEmail) {
      // userEmail is not stored in local storage, so return an empty cart
      return new Cart();
    }
    let cart = this.carts[userEmail];
    if (!cart) {
      cart = new Cart();
      this.carts[userEmail] = cart;
    }
    return cart;
  }
  pay(){
    let body =JSON.stringify(this.mycart);
    return this.http.post(this.baseURL+'carts',body,{headers:this.headers});
  }
  addtoCart(product: CartProduct): void {
    
    const cart = this.getCurrentUserCart();
    let existingProduct = cart.products.find(p => p.product.name === product.product.name);
    if (existingProduct) {
        existingProduct.qty++;
        cart.Totalprice += product.product.price;
    } else {
      alert("iteam added to cart")
        cart.products.push(product);
        cart.Totalprice += product.product.price;
    }
  }
  removeCartItem(product: CartProduct): void {
    
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index !== -1) {
      cart.products.splice(index, 1);
      cart.Totalprice -= product.product.price * product.qty;
    }
  }
  
  QuantityUp(product: CartProduct): void {
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index > -1) {
      cart.products[index].qty += 1;
      cart.Totalprice += product.product.price;
    }
  }
  
  QuantityDown(product: CartProduct): void {
    const cart = this.getCurrentUserCart();
    const index = cart.products.indexOf(product);
    if (index > -1) {
      cart.products[index].qty -= 1;
      cart.Totalprice -= product.product.price;
    }
  }
  
  getProducts(): CartProduct[] {
    const cart = this.getCurrentUserCart();
    return cart.products;
  }
  
  gettotalprice(): number {
    const cart = this.getCurrentUserCart();
    return cart.Totalprice;
  }
  
  clearCart(): CartProduct[] {
    const cart = this.getCurrentUserCart();
    cart.products = [];
    cart.Totalprice = 0;
    return cart.products;
  }
  
  makePayment(): void {
    const cart = this.getCurrentUserCart();
    const userEmail = localStorage.getItem('user');
    if (cart.User === null){
      alert("you must be logged in to make the payment");
      this.router.navigateByUrl('/profile/login'); // navigate the user to the login page
    } else if(userEmail) {

      alert("Payment Successful");
      cart.paymentMade = true;
      this.saveCart().subscribe(); 
      this.clearCart();
    } 
  }
  saveCart(): Observable<any> {
    const currentUserCart = this.getCurrentUserCart();
    let body = JSON.stringify({ cart: currentUserCart });   
     let b = JSON.stringify(this.carts['products']);

    return this.http.post(this.baseURL+'carts',body,{
      headers:this.headers
})
}
}