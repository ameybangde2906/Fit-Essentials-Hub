import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { GetAllProductsService } from '../services/get-all-products.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-supp-deals',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  templateUrl: './top-supp-deals.component.html',
  styleUrl: './top-supp-deals.component.css'
})
export class TopSuppDealsComponent {
  faIndianRupeeSign = faIndianRupeeSign
  faChevronRight =faChevronRight 
  products:any
  selectedTagIndex: string ="Protine";
  currentIndex = 0;
  screen:any=30
  gif=false

  constructor(private getAllproducts:GetAllProductsService, private router:Router){}
 
  ngOnInit(){
    this.checkScreen()
    this.gif=true
    return this.getAllproducts.getsuppTypeDiscount("Protine").subscribe((res)=>{
      this.products = res
      this.gif=false
      this.selectedTagIndex='Protine'
      this.products = this.products.slice(0, 8);
    })
  }
  
  function(types:string){
    this.gif=true
    this.selectedTagIndex =types
    this.currentIndex=0
    return this.getAllproducts.getsuppTypeDiscount(types).subscribe((res)=>{
        this.products = res
        this.gif=false
      this.products = this.products.slice(0, 8);
    })
  }

  viewAll(){
    window.scrollTo({top:0, behavior:"auto"})
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
      console.log(this.currentIndex)
    }
  }

  checkScreen(){
    const isMobile = window.innerWidth <1000 ;
    if(isMobile){
      this.screen=70
    }
  }
}
