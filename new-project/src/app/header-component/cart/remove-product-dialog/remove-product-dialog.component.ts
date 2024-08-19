import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { wishList } from '../../../data-type';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-remove-product-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './remove-product-dialog.component.html',
  styleUrl: './remove-product-dialog.component.css'
})
export class RemoveProductDialogComponent {
  trash = faTrashCan
  product: wishList | undefined

  constructor(
    private wishListService: WishlistService, private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public item: any,
    private dialogRef: MatDialogRef<RemoveProductDialogComponent>) { }

  remove() {
    this.cartService.removeToCart(this.item._id).subscribe({
      next: (res) => {
        this.dialogRef.close('delete');
      }
    })
  }

  wishList() {
    console.log(this.item.userId)
    this.wishListService.getbyuserIdandproductId(this.item.productId, this.item.userId).subscribe((result) => {
      if (result.length>0) {
        alert('product is already in wishlist')
        this.remove()
      } else {
        this.wishListService.addTowishList(this.item).subscribe({
          next: (res) => {
            this.dialogRef.close('wishlist')
            this.remove()
          }
        })
      }
    })

  }
}

