import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { GetAllProductsService } from '../services/get-all-products.service';

@Component({
  selector: 'app-top-acc-deals',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  templateUrl: './top-acc-deals.component.html',
  styleUrl: './top-acc-deals.component.css'
})
export class TopAccDealsComponent {
  faChevronRight = faChevronRight
  faIndianRupeeSign = faIndianRupeeSign
  products:any
  selectedTagIndex: string | null = null;
  currentIndex = 0;
  screen:any=30
  gif=false

  constructor(private getAllproducts:GetAllProductsService, private router:Router){}

  ngOnInit(){
    this.checkScreen()
    this.gif=true
    return this.getAllproducts.getaccTypeDiscount("Gloves and Wrist Straps").subscribe((res)=>{
      this.products = res
      this.gif=false
      this.selectedTagIndex='Gloves and Wrist Straps'
      this.products = this.products.slice(0, 8);
    })
  }

  function(types:string){
    this.gif=true
    this.selectedTagIndex =types
    this.currentIndex=0
    return this.getAllproducts.getaccTypeDiscount(types).subscribe((res)=>{
        this.products = res
        this.gif=false
      this.products = this.products.slice(0, 8);
    })
  }
  viewAll(){
    this.router.navigate([ `${this.selectedTagIndex}`]);
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
