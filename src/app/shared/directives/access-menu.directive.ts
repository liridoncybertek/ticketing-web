import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {TokenService} from '../services/general/token.service';

@Directive({
  selector: '[appAccessMenu]'
})
export class AccessMenuDirective implements OnInit {

  @Input() appAccessMenu: any;
  private role: string;

  constructor(private tokenService: TokenService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.role = this.tokenService.getRoleFromToken();
    this.checkAccess();
  }

  checkAccess(): void {
    const style = this.elementRef.nativeElement.style;
    this.appAccessMenu.indexOf(this.role) !== -1 ? style.display = 'block' : style.display = 'none';
  }

}
