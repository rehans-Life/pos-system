import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() title = '';
  @Input() price!: number;
  @Input() category = '';
  @Input() image = '';
  @Output() add = new EventEmitter();
}
