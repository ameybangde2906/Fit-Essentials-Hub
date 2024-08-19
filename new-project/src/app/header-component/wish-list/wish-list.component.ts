import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from '../../Account-section/accounts/accounts.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule,AccountsComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  show=false
  cart=faShoppingCart
  trash=faTrash
  rupee = faIndianRupee
  products: any
  constructor(private wishList: WishlistService, private cartService:CartService ) { }

  ngOnInit() {
   this.getwishListProducts()
  }

  getwishListProducts(){
    this.wishList.getwishListProduct().subscribe((result) => {
      this.products = result
      console.log(result)
      if(!this.products?.length){
        this.show=true
      }
      else{
        this.show=false
      }
    })
  }

  delete(productId:string,userId:string){
    this.wishList.deleteWishlistProduct(productId,userId).subscribe(()=>{
      this.getwishListProducts()
    })
  }

  moveTocart(productData:any){
    console.log(productData)
    this.cartService.addToCart(productData).subscribe(()=>{
      this.delete(productData.productId,productData.userId)
      this.getwishListProducts()
      let userStore = localStorage.getItem('user_id');
      let userData = userStore && JSON.parse(userStore);
      this.cartService.getCartList(userData._id)
    })
  }
}
