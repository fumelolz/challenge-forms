import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public handleSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
}
