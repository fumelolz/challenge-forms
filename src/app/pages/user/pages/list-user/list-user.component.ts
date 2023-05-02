import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Email', 'Rol', 'Acciones'];
  users: User[] = [];
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
    });
  }
}
