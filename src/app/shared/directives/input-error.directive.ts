import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Self,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputError]',
})
export class InputErrorDirective {
  @Input() public class!: string;

  constructor(@Self() private ngControl: NgControl) {}

  @HostBinding('class.valid')
  public get isValid(): boolean | null {
    return this.valid;
  }

  @HostBinding('class.invalid')
  public get isInvalid(): boolean | null {
    return this.invalid;
  }

  public get valid(): boolean | null {
    return (
      this.ngControl.valid && (this.ngControl.dirty || this.ngControl.touched)
    );
  }

  public get invalid(): boolean | null {
    return (
      !this.ngControl.pending &&
      !this.ngControl.valid &&
      (this.ngControl.touched || this.ngControl.dirty)
    );
  }
}
