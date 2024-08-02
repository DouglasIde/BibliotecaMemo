import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos = [
    // {
    //   conteudo: 'Passo informações para o componente filho',
    //   autoria: 'Componente Pai',
    //   modelo: 'modelo3'
    // },
    // {
    //   conteudo: 'Estudar Alura todas as manhãs',
    //   autoria: 'Alura',
    //   modelo: 'modelo2'
    // }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
