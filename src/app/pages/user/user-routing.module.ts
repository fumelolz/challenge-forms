import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/list-user/list-user.module').then(
            (m) => m.ListUserModule
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./pages/add-user/add-user.module').then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: 'update/:id',
        loadChildren: () =>
          import('./pages/add-user/add-user.module').then(
            (m) => m.AddUserModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
