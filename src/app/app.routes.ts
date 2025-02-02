import { authGuard } from './shared/guards/auth/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { guestGuardGuard } from './shared/guards/GuestGuard/guest-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  {
    path: 'signin',
    component: LoginComponent,
    canDeactivate: [guestGuardGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent },
];
