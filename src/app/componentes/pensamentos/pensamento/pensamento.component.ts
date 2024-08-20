import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I Love Angular',
    autoria: 'Douglas',
    modelo: 'modelo3',
    favorito: false
  }

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g';
    } else {
      return 'pensamento-p';
    }
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito == false){
      return 'inativo'
    } else {
      return 'ativo'
    }
  }

  atualizarFavoritos(){
    this.service.mudarFavorito(this.pensamento).subscribe();
    console.log(this.pensamento.favorito)
  }
}
