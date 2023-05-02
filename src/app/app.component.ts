import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, delay } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  isLoading = false;
  public sub!: Subscription;
  constructor(private loaderService: LoaderService) {}

  ngAfterViewInit(): void {
    this.sub = this.loaderService.isLoading
      .pipe(delay(200))
      .subscribe((response) => {
        this.isLoading = response;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
