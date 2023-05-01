import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/list-product/list-product.module').then(
            (m) => m.ListProductModule
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./pages/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: 'update/:id',
        loadChildren: () =>
          import('./pages/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
