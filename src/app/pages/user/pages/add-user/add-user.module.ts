import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AddUserModule {}
