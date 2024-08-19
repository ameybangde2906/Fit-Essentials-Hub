import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetAllProductsService } from '../../services/get-all-products.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,RouterOutlet],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  
  route=inject(Router)
  productList:undefined | any
  updateProductForm !:FormGroup;
  fb=inject(FormBuilder)
  category:any=[]
  type:any=[]

  constructor(private getAllproducts:GetAllProductsService, private activatedRoute:ActivatedRoute) {}
  
  ngOnInit(): void{
      this.updateProductForm = this.fb.group({
        productName: ['', Validators.required],
        productCost: ['', Validators.required],
        productDiscount: ['', Validators.required],
        productBrand: ['', Validators.required],
        productWeight: ['', Validators.required],
        productCategory: ['', Validators.required],
        productType: ['', Validators.required],
        productFeature: [''],
        productDescription: ['', Validators.required],
        productImage: ['', Validators.required],
      });


      let productId=this.activatedRoute.snapshot.paramMap.get('id')

    productId && this.getAllproducts.getById(productId).subscribe(res=>{
      this.productList= res;
    })

    this.category=this.getAllproducts.categories()
    this.type=this.getAllproducts.types()
  }

  onSelect(id:any){
    this.type=this.getAllproducts.types().filter(e=>e.category==id.target.value)
  }

  updateProduct(productId:string){
    this.getAllproducts.updateProduct(productId, this.updateProductForm.value).subscribe({
      next:()=>{
        this.route.navigate(['product-list'])
      }
    })
  }

}
