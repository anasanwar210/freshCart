import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { NewPasswordComponent } from './layout/additions/new-password/new-password.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { ProductdetailsComponent } from './layout/additions/productdetails/productdetails.component';
import { SubmitCodeComponent } from './layout/additions/submit-code/submit-code.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { guestGuard } from './shared/guard/guest/guest.guard';
import { authGuard } from './shared/guards/auth/auth.guard';
import { ChangePasswordComponent } from './layout/additions/change-password/change-password.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';
import { WishlistComponent } from './layout/additions/wishlist/wishlist.component';

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
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    title: 'Change Password',
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Wish List',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    component: AllordersComponent,
    title: 'All Orders',
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    title: 'Checkout',
    canActivate: [authGuard],
  },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'details/:id', component: ProductdetailsComponent, title: 'Details' },
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
