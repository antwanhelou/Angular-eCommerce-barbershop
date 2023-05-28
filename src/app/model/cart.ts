import { Product } from "src/app/model/product";
import { User } from "./user";

export class Cart{
    static genID:number=1
    id:number | undefined
    User :any
    products : CartProduct[] =[]
    Totalprice = 0;
    paymentMade = false;



constructor() {
    this.User=localStorage.getItem('user');
    this.products = [];
   
  }
}

export class CartProduct{
    product : Product
    qty : number = 1
    constructor(product:Product){
        this.product = product
    }
}























//     add(product:Product){
//         let found = false
//         this.total+= product.price
//         for(let item of this.products){
//             if(item.product == product){
//                 item.qty++
//                 found = true
//             }
//         }
//         if(!(found))
//         this.products.push(new CartProduct(product));
        
//     }

    
// empty(){
    
//         return this.products.pop()
//     }
// remove(product: CartProduct): void{
//     const cart = this.getCurrentUserCart();
//     const index = cart.products.indexOf(product);
//     for(let item of this.products){
//     item.qty--
//     if(item.qty==0)
//     this.products.splice()
//     }
// }
// }

