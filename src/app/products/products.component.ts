import { Component, OnInit ,Input, OnChanges, SimpleChanges, SimpleChange, ɵɵqueryRefresh } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../model/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  products : Product[] = []
  _genre : string =""
  totalprice:number=0;
 
  
  constructor(private productService : ProductsService,private cartService : CartService) { }

  ngOnInit(): void {
    this.productService.getproducts()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="machine"){
          a.category ="machine"
        }
        if(a.category ==="material"){
          a.category ="material"
        }
        if(a.category ==="hand"){
          a.category ="hand"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
   
  }
  

  addtocart(product: Product){
    const c = new CartProduct(product);
    this.cartService.addtoCart(c);
  }
  gettotalprice(){
    return this.totalprice;
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
