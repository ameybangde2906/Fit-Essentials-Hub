import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetAllProductsService } from '../../services/get-all-products.service';

@Component({
  selector: 'app-delete-product-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.css'
})
export class DeleteProductDialogComponent {

  trash=faTrashCan

  constructor(
    private getAllprooduct:GetAllProductsService,
    @Inject(MAT_DIALOG_DATA) public id:any,
    private dialogRef:MatDialogRef<DeleteProductDialogComponent> )
    {}
  
  delete(){
    this.getAllprooduct.deleteProduct(this.id).subscribe({
      next:(res)=>{
        alert("Product Deleted");
        this.dialogRef.close('delete');
      }
    })
  }
  cancel(){
    this.dialogRef.close('cancel')
  }
  
}
