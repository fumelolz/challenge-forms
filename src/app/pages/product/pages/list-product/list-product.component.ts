import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  products: Observable<any> = this.productService.getAll();
  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {}
}
