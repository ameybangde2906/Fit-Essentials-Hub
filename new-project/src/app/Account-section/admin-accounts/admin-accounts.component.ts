import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { AddProductsComponent } from '../add-products/add-products.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { GetAllProductsService } from '../../services/get-all-products.service';

@Component({
  selector: 'app-admin-accounts',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FontAwesomeModule, AddProductsComponent, ProductListComponent],
  templateUrl: './admin-accounts.component.html',
  styleUrl: './admin-accounts.component.css'
})
export class AdminAccountsComponent {

  constructor(private getAllProducts: GetAllProductsService) { }


  router = inject(Router);
  faPowerOff = faPowerOff;
  faPlusMinus = faPlusMinus;
  faUser = faUser;
  faRectangleList = faRectangleList


  adminLogout() {
    localStorage.removeItem("Admin_id");
    alert("You logged out successfully !");
    this.router.navigate(["login"]);
  }

  adminStore = localStorage.getItem('Admin_id');
  adminData = this.adminStore && JSON.parse(this.adminStore);
  adminName = this.adminData ?.firstName



}