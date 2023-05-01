import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sideBar = true;
  constructor(
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    public readonly authService: AuthService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit(): void {}

  handleAside() {
    // if (!this.document.body.classList.contains('aside-closed')) {
    //   this.renderer.addClass(this.document.body, 'aside-closed');
    //   return;
    // }
    // this.renderer.removeClass(this.document.body, 'aside-closed');
    this._sidebarService.handleSidebar.next(this.sideBar);
    this.sideBar = !this.sideBar;
  }

  logout(): void {
    this.authService.logout();
  }
}
