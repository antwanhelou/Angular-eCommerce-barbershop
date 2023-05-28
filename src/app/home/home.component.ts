import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from '../model/cart';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 

})

export class HomeComponent implements OnInit {

  title1= "TOP 3 PRODUCTS !";
  contact = " Feel free to Contact us";
  products : Product[]=[]

  constructor( private service:ProductsService,private cartService:CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.service.getPopular().subscribe((data:Product[])=>this.products=data)
}
addtocart(product: Product){
  const c = new CartProduct(product);
  this.cartService.addtoCart(c);
}
}