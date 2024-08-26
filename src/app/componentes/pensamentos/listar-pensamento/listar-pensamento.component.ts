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

  // carregarMaisPensamentos(){
  //   this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
  //     this.listaPensamentos.push(...listaPensamentos);
  //     if(!listaPensamentos.length){
  //       this.haMaisPensamentos = false
  //     }
  //   })
  // }

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
    console.log('Pensamentos carregados:', listaPensamentos);
    if(this.paginaAtual === 1){
      this.listaPensamentos = listaPensamentos;
    } else {
      this.listaPensamentos.push(...listaPensamentos);
    }
    this.haMaisPensamentos = listaPensamentos.length > 0;
  });
 }

  // carregarMaisPensamentos(){
  //   this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
  //     const pensamentosUnicos = listaPensamentos.filter(pensamento => {
  //       return !this.listaPensamentos.some(existingPensamento => existingPensamento.id === pensamento.id);
  //     });
  //     this.listaPensamentos.push(...pensamentosUnicos);
  //     if(!pensamentosUnicos.length){
  //       this.haMaisPensamentos = false;
  //     }
  //   });
  // }

  carregarMaisPensamentos(){
    if(this.haMaisPensamentos){
      this.paginaAtual++;
      this.carregarPensamentos();
    }
  }

  // pesquisarPensamentos(){
  //   console.log('Filtrando pensamentos com filtro: ', this.filtro);
  //   this.carregarMaisPensamentos();
  //   this.haMaisPensamentos = true;
  //   this.paginaAtual = 1;
  //   this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
  //     this.listaPensamentos = listaPensamentos
  //   })
  // }

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
