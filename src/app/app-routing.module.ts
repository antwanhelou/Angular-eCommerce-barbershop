import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsComponent } from './products/products.component';
const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:"home",component:HomeComponent},
  {path:"about-us",component:AboutUsComponent},
  {path:"catalog",component:ProductsComponent},
  {path:"profile",component:LoginRegisterComponent,
    children: [
      {path:'',pathMatch:'full',redirectTo:'login'},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:"userdetails/:email",component:UserdetailsComponent},
    ]},
    {path:"cart",component:CartComponent,
    children: [
      {path:'checkout',component:CheckoutComponent},
]},
    {path:"**",component:ErrorComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
