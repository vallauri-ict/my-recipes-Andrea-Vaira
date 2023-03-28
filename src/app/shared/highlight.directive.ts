import { Directive, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {

  @Input('appHighlight') hoverColor: any = 'Cyan';
  @Input() defaultColor: any = 'LightCyan';
  @HostBinding('style.backgroundColor') backgroundColor: any =
    this.defaultColor;
    
  ngOnInit() {
    // this rappresenta la classe corrente
    this.backgroundColor = this.defaultColor;
  }
  @HostListener('mouseenter') evidenzia(event: Event) {
    this.backgroundColor = this.hoverColor;
  }
  @HostListener('mouseleave') rilascia(event: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
