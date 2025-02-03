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
import { guestGuard } from './shared/guard/guest/guest.guard';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { SubmitCodeComponent } from './layout/additions/submit-code/submit-code.component';
import { NewPasswordComponent } from './layout/additions/new-password/new-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
    canActivate: [authGuard],
  },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'submitCode', component: SubmitCodeComponent, title: 'Submit Code' },
  {
    path: 'setNewPassword',
    component: NewPasswordComponent,
    title: 'Set New Password',
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'Find My Account',
  },
  {
    path: 'signin',
    component: LoginComponent,
    title: 'Sign In',
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [guestGuard],
  },
  { path: '**', component: NotfoundComponent, title: 'Page Not Found' },
];
