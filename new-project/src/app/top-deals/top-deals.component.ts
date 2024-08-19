import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../services/get-all-products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-deals',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterModule],
  templateUrl: './top-deals.component.html',
  styleUrl: './top-deals.component.css'
})
export class TopDealsComponent {

  products: any
  faIndianRupeeSign=faIndianRupeeSign

  constructor(private getAllproducts: GetAllProductsService) { }

}
