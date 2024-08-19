import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAllProductsService } from '../../services/get-all-products.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  addproductForm !: FormGroup;

  category: any = []
  type: any = []

  constructor(private products: GetAllProductsService) { }
  ngOnInit(): void {
    this.addproductForm = this.fb.group({
      productName: ['', Validators.required],
      productCost: ['', Validators.required],
      productDiscount: ['', Validators.required],
      productBrand: ['', Validators.required],
      productWeight: ['', Validators.required],
      productCategory: ['', Validators.required],
      productType: ['', Validators.required],
      productDescription: ['', Validators.required],
      productFeature: [''],
      productImage: ['', Validators.required],
    });

    this.category = this.products.categories()
    console.log(this.category)
  }

  onSelect(category:any){
    this.type=this.products.types().filter(e=>e.category==category.target.value)
  }

  addproduct() {
    this.products.addproductService(this.addproductForm.value)
      .subscribe({
        next: (res) => {
          this.addproductForm.reset();
          this.router.navigate(['add-products'])
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}

