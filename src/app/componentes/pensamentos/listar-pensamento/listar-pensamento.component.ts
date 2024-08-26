import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { BotaoCarregarMaisComponent } from './botao-carregar-mais/botao-carregar-mais.component';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})

export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  filtroSubject: Subject<string> = new Subject<string>();

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPensamentos();
    this.carregarMaisPensamentos();
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  listarPensamentos(): void{
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    })
  }

 aplicarFiltro(filtro: string): void{
  this.filtro = filtro;
  this.paginaAtual = 1;
  this.service.buscarPensamento(filtro).subscribe(listaPensamentos => {
    this.listaPensamentos = listaPensamentos;
  });
 }

 carregarPensamentos(){
  this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
    console.log('Pensamento carregados:', listaPensamentos);

    if(this.paginaAtual === 1){
      this.listaPensamentos = listaPensamentos;
    } else {
      const pensamentosUnicos = listaPensamentos.filter(pensamento => {
        return !this.listaPensamentos.some(existingPensamento => existingPensamento.id === pensamento.id);
      });
      this.listaPensamentos.push(...pensamentosUnicos);
    }
    this.haMaisPensamentos = listaPensamentos.length > 0;
  });
 }

  carregarMaisPensamentos(){
    if(this.haMaisPensamentos){
      this.paginaAtual++;
      this.carregarPensamentos();
    }
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.favoritos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaDePensamentosFavoritos => {
      this.listaPensamentos = listaDePensamentosFavoritos
      this.listaFavoritos = listaDePensamentosFavoritos
    });
  }

  recarregarComponente(){
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }
}
