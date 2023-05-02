import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  public sending = false;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _productService: ProductService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly _activedRoute: ActivatedRoute
  ) {
    this.productForm = this._fb.group({
      id: [0, Validators.required],
      cost: [null, [Validators.required, Validators.pattern(/^[0-9.]*$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      quantity: [0, Validators.required],
    });
  }
  ngOnInit(): void {
    if (this._activedRoute.snapshot.paramMap.get('id')) {
      this.productForm.disable();
      this.id.setValue(+this._activedRoute.snapshot.paramMap.get('id')!);
      this._productService.getOneById(this.id.value).subscribe({
        next: (response) => {
          this.productForm.patchValue({ ...response });
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this._snackBar.open('Producto no encontrado', '', {
                duration: 3000,
              });
              this._router.navigateByUrl('/home/products');
            }
          }
        },
        complete: () => {
          this.productForm.enable();
        },
      });
    }
  }

  save() {
    this.sending = true;

    if (this.quantity.value < 0) {
      this._snackBar.open('No puede haber cantidades negativas', '', {
        duration: 3000,
      });
      this.sending = false;
      return;
    }
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this._snackBar.open('Formulario invalido', '', {
        duration: 3000,
        panelClass: 'text-info',
      });
      this.sending = false;
      return;
    }

    if (this.id.value === 0) {
      this.saveOne();
    } else {
      this.updateOne();
    }
  }

  saveOne() {
    this._productService.saveOne(this.productForm.value).subscribe({
      next: (response) => {
        this._snackBar.open('Guardado Correctamente', '', {
          duration: 3000,
        });
        this._router.navigate(['home', 'products']);
      },
      complete: () => {
        this.sending = false;
      },
    });
  }

  updateOne() {
    this._productService
      .updateOne(this.id.value, {
        id: this.id.value,
        ...this.productForm.value,
      })
      .subscribe({
        next: (response) => {
          this._snackBar.open('Actualizado Correctamente', '', {
            duration: 3000,
          });

          this._router.navigate(['home', 'products']);
        },
        complete: () => {
          this.sending = false;
        },
      });
  }

  get id(): AbstractControl {
    return this.productForm.get('id')!;
  }

  get cost(): AbstractControl {
    return this.productForm.get('cost')!;
  }
  get name(): AbstractControl {
    return this.productForm.get('name')!;
  }

  get quantity(): AbstractControl {
    return this.productForm.get('quantity')!;
  }
}
