import { Component,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule,],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  router = inject(Router);
  faPowerOff = faPowerOff;
  faBoxOpen = faBoxOpen;
  faHeart = faHeart;
  faUser = faUser;
  faLocationDot = faLocationDot

  constructor(private product: CartService) { }
  logout(): void {
    localStorage.removeItem('user_id');
    this.router.navigate(['login'])
    this.product.cartData.emit([])
  }

  userStore = localStorage.getItem('user_id');
  userData = this.userStore && JSON.parse(this.userStore);
  userName = this.userData?.firstName

  profile(){
    this.router.navigate(['profile-info'])
  }
  orders(){
    this.router.navigate(['my-orders'])
  }
  wishlist(){
    this.router.navigate(['wishlist'])
  }
  address(){
    this.router.navigate(['address-info'])
  }

}

