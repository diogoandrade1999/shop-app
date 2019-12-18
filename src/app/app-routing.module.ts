import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { CartComponent} from './cart/cart.component';
import { AboutComponent} from './about/about.component';
import { SupportComponent} from './support/support.component';
import { HomeComponent } from './home/home.component';
import { PhoneComponent} from './phone/phone.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'about', component: AboutComponent},
  {path: 'support', component: SupportComponent},
  {path: 'phone/:id', component: PhoneComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
