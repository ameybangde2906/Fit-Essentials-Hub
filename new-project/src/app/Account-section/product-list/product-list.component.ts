import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../../services/get-all-products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, RouterModule, MatDialogModule, MatButtonModule, UpdateProductComponent, RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  edit = faPenToSquare
  trash = faTrashCan
  router = inject(Router)
  show=false
  hide=true
  public productList: any

  constructor(private getAllproducts: GetAllProductsService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllproducts.getAllproducts().subscribe(res => {
      this.productList = res;
    })
  }

  openDialog(id:string) {
    this.dialog.open(DeleteProductDialogComponent, {
      width:'300px',
      data:id
    }).afterClosed().subscribe(val=>{
      if(val==='delete'){
        this.getAllproducts.getAllproducts().subscribe(res => {
          this.productList = res;
        })
      }
    })
  }
}

