import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-carregar-mais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-carregar-mais.component.html',
  styleUrl: './botao-carregar-mais.component.scss'
})
export class BotaoCarregarMaisComponent {

  @Input() haMaisPensamentos: boolean = false;
  @Output() click = new EventEmitter<void>();

  constructor(){ }

  ngOnInit(): void {

  }
}
