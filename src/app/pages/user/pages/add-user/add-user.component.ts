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
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public showPass = false;
  public userForm: FormGroup = new FormGroup({});
  public roles = [
    {
      id: 'ADMIN',
      name: 'Administrador',
    },
    {
      id: 'CLIENT',
      name: 'Cliente',
    },
  ];
  public sending = false;
  public _id = 0;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _userService: UserService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly _activedRoute: ActivatedRoute
  ) {
    this.userForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['CLIENT', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this._activedRoute.snapshot.paramMap.get('id')) {
      this.userForm.disable();
      this._id = +this._activedRoute.snapshot.paramMap.get('id')!;
      this._userService.getOneById(this._id).subscribe({
        next: (response) => {
          if (response) {
            this.userForm.patchValue({ ...response });
            return;
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this._snackBar.open('Usuario no encontrado', '', {
                duration: 3000,
              });
              this._router.navigateByUrl('/home/users');
            }
          }
        },
        complete: () => {
          this.userForm.enable();
        },
      });
    }
  }

  save() {
    this.sending = true;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this._snackBar.open('Formulario invalido', '', {
        duration: 3000,
        panelClass: 'text-info',
      });
      this.sending = false;
      return;
    }

    if (this._id === 0) {
      this.saveOne();
    } else {
      this.updateOne();
    }
  }

  saveOne() {
    this._userService.saveOne(this.userForm.value).subscribe({
      next: (response) => {
        this._snackBar.open('Guardado Correctamente', '', {
          duration: 3000,
        });
        this._router.navigateByUrl('/home/users');
      },
      complete: () => {
        this.sending = false;
      },
    });
  }

  updateOne() {
    this._userService
      .updateOne(this._id, { id: this._id, ...this.userForm.value })
      .subscribe({
        next: (response) => {
          this._snackBar.open('Actualizado Correctamente', '', {
            duration: 3000,
          });
          this._router.navigateByUrl('/home/users');
        },
        complete: () => {
          this.sending = false;
        },
      });
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }
  get name(): AbstractControl {
    return this.userForm.get('name')!;
  }

  get last_name(): AbstractControl {
    return this.userForm.get('last_name')!;
  }

  get role(): AbstractControl {
    return this.userForm.get('role')!;
  }
}
