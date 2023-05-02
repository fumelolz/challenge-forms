import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input('name') name = '';
  @Input('icon') icon = '';
  @Input('link') link = '';
  constructor() {}

  ngOnInit(): void {}
}
