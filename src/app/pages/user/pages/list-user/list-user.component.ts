import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Email', 'Rol', 'Acciones'];
  users: Observable<any> = this.userService.getAll();
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}
}
