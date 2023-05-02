import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Costo',
    'Cantidad',
    'Acciones',
  ];
  products: Product[] = [];
  constructor(
    private readonly _productService: ProductService,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getAll().subscribe({
      next: (response) => {
        this.products = response;
      },
    });
  }

  deleteOne(id: number) {
    this._productService.deleteOne(id).subscribe({
      next: () => {
        this._snackBar.open('Producto eliminado', '', {
          duration: 3000,
        });
      },
      complete: () => {
        this.getProducts();
      },
    });
  }
}
