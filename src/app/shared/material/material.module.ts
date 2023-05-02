import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
const MODULES = [
  CommonModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES],
  providers: [MatDatepickerModule],
})
export class MaterialModule {}
