import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  products: any
  selectedTagIndex: any
  currentIndex = 0;
  screen:any=25
  gif=false

  constructor(private orderService: OrderService, private router: Router) { }


  ngOnInit() {
    this.checkScreen()
    this.gif=true
    return this.orderService.bestSellers('Weights and Barbells').subscribe((res) => {
      this.gif=false
      this.products = res
      this.selectedTagIndex = 'Weights and Barbells'
      this.products = this.products.slice(0, 8);
    })
  }
  function(category: string) {
    this.gif=true
    this.selectedTagIndex = category
    this.currentIndex=0
    return this.orderService.bestSellers(category).subscribe((res) => {
      this.gif=false
      this.products = res
      this.products = this.products.slice(0, 8);
    })

  }
  
   viewAll() {
    this.router.navigate(['best-seller'])
    window.scrollTo({top:0, behavior:"auto"})
  }

  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

  }

  rightButton=true
  slideRight() {
    if (this.currentIndex < this.products.length - 1 ) {
      this.currentIndex++;
    }
  }

  checkScreen(){
    const isMobile = window.innerWidth <1000 ;
    if(isMobile){
      this.screen=70
    }
  }
}

