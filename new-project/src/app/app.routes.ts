import { Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { RegistrationComponent } from './user-auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './header-component/cart/cart.component';
import { ForgetPasswordComponent } from './user-auth/forget-password/forget-password.component';
import { ResetComponent } from './user-auth/reset/reset.component';
import { AccountsComponent } from './Account-section/accounts/accounts.component';
import { adminAuthGuard, authGuard, loginAuthGuard } from './auth.guard';
import { AdminLoginComponent } from './user-auth/admin-login/admin-login.component';
import { AdminAccountsComponent } from './Account-section/admin-accounts/admin-accounts.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddressComponent } from './address/address.component';
import { ProductListComponent } from './Account-section/product-list/product-list.component';
import { UpdateProductComponent } from './Account-section/update-product/update-product.component';
import { WishListComponent } from './header-component/wish-list/wish-list.component';
import { ProfileInfoComponent } from './Account-section/profile-info/profile-info.component';
import { MyOrdersComponent } from './Account-section/my-orders/my-orders.component';
import { AddressInfoComponent } from './Account-section/address-info/address-info.component';
import { BestSellerProductsComponent } from './best-seller-products/best-seller-products.component';
import { AdminProfileInfoComponent } from './Account-section/admin-profile-info/admin-profile-info.component';
import { AddProductsComponent } from './Account-section/add-products/add-products.component';
import { TopDealsProductsComponent } from './top-deals-products/top-deals-products.component';
import { CommonComponentComponent } from './header-component/common-component/common-component.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Home | FitEssentials Hub"
    },
    {
        path: 'login',
        component: LoginComponent,
        title: "Login | FitEssentials Hub",
        canActivate: [loginAuthGuard]
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent,
        title: "Admin Login | FitEssentials Hub",
        canActivate: [loginAuthGuard]
    },
    {
        path: 'registration',
        component: RegistrationComponent,
        title: "Registration | FitEssentials Hub",
        canActivate: [loginAuthGuard]
    },
    {
        path: 'add-products',
        component: AddProductsComponent,
        title: "Add Products | FitEssentials Hub",
        canActivate: [adminAuthGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        title: "Cart | FitEssentials Hub"

    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: "Forget Password | FitEssentials Hub",
        canActivate: [loginAuthGuard]
    },
    {
        path: 'reset/:token',
        component: ResetComponent,
        title: "Reset Password | FitEssentials Hub",
        canActivate: [loginAuthGuard]
    },
    {
        path: 'accounts',
        component: AccountsComponent,
        title: "Accounts | FitEssentials Hub",
        canActivate: [authGuard]
    },
 
    {
        path: 'admin-accounts',
        component: AdminAccountsComponent,
        title: "Admin Account | FitEssentials Hub",
        canActivate: [adminAuthGuard]
    },
    {
        path: 'search/:key',
        component: SearchedProductsComponent,
        title: "Search  | FitEssentials Hub",
    },
    {
        path: 'details/:id/:type',
        component: ProductDetailsComponent,
        title: "Product Info  | FitEssentials Hub",

    },
    {
        path: 'address',
        component: AddressComponent,
        title: "Address | FitEssentials Hub",
        canActivate: [authGuard]
    },
    {
        path: 'product-list',
        component: ProductListComponent,
        title: "Product List | FitEssentials Hub",
        canActivate: [adminAuthGuard]
    },
    {
        path: 'update-product/:id',
        component: UpdateProductComponent,
        title: "Update Product | FitEssentials Hub"
    },
    {
        path: 'wishlist',
        component: WishListComponent,
        title: "Wishlist | FitEssentials Hub",
        canActivate: [authGuard]
    },
    {
        path: 'profile-info',
        component: ProfileInfoComponent,
        title: "Profile Info | FitEssentials Hub",
        canActivate: [authGuard]
    },
    {
        path: 'my-orders',
        component: MyOrdersComponent,
        title: "My Orders | FitEssentials Hub",
        canActivate: [authGuard]
    },
    {
        path: 'address-info',
        component: AddressInfoComponent,
        title: "Address Info | FitEssentials Hub",
        canActivate: [authGuard]
    },
    {
        path:"best-seller",
        component:BestSellerProductsComponent,
        title:"Best Sellers | FitEssentials Hub"
    },
    {
        path:"admin-profile",
        component:AdminProfileInfoComponent,
        title:"Admin Profile | FitEssentials Hub",
        canActivate: [adminAuthGuard]
    },
    {
        path:":key",
        component:TopDealsProductsComponent,
        title:"Top Deals | FitEssentials Hub"
    },
    {
        path:"brand/:brand",
        component:TopDealsProductsComponent,
        title:"Top Deals | FitEssentials Hub"
    },
    {
        path:"supp-top-deals/:category",
        component:TopDealsProductsComponent,
        title:"Top Deals | FitEssentials Hub"
    },
    {
        path:"category/:key",
        component:CommonComponentComponent,
        title:"Top Deals | FitEssentials Hub"
    },
];
