import { Component, OnInit, HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule,Router } from '@angular/router';
import { BestSellersComponent } from '../best-sellers/best-sellers.component';
import { TopDealsComponent } from '../top-deals/top-deals.component';
import { WhyFitessentialsComponent } from '../why-fitessentials/why-fitessentials.component';
import { ShopByBrandsComponent } from '../shop-by-brands/shop-by-brands.component';
import { TopSuppDealsComponent } from '../top-supp-deals/top-supp-deals.component';
import { TopSuppBrandsComponent } from '../top-supp-brands/top-supp-brands.component';
import { TopAccDealsComponent } from '../top-acc-deals/top-acc-deals.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, BestSellersComponent, TopDealsComponent, WhyFitessentialsComponent, ShopByBrandsComponent, TopSuppDealsComponent, TopSuppBrandsComponent,TopAccDealsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  activeBox:any=0;
  isSmallScreen: boolean = window.innerWidth < 700;

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isSmallScreen = window.innerWidth < 700;
  }

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}


