import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

type NewType = Document;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sub!: Subscription;
  constructor(
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private document: NewType,
    public readonly authService: AuthService,
    private _sidebarService: SidebarService
  ) {}
  ngOnInit(): void {
    this.sub = this._sidebarService.handleSidebar.subscribe((res) => {
      if (res) {
        this.renderer.addClass(this.document.body, 'aside-closed');
        return;
      }
      this.renderer.removeClass(this.document.body, 'aside-closed');
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
