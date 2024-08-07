import { Component, OnInit } from '@angular/core';
import { Pensamento } from './../pensamento';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 1,
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo1'
  }

  constructor() { }

  ngOnInit(): void {
  }

  criarPensamento(){
    alert("Novo Pensamento Criado!!");
  }

  cancelar(){
    alert("Cancelando um Pensamento!!");
  }
}
