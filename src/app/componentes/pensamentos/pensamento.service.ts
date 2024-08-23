import { ListarPensamentoComponent } from './listar-pensamento/listar-pensamento.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:8080/pensamentos'
  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favorito: boolean): Observable<Pensamento[]>{
    // const itensPorPagina = 6;
    // let params = new HttpParams().set("_page", pagina.toString()).set("_limit", itensPorPagina)

    // if(filtro.trim().length > 0){
    //   params = params.set('conteudo', filtro)
    // }

    // if(favorito){
    //   params = params.set("favorito", true);
    // }

    // return this.http.get<Pensamento[]>(this.API, {params})

    let url = this.API;
    let queryParams: string[] = [];
    let params = new HttpParams();

    params = params.set('pagina', pagina.toString());

    if(filtro.trim().length > 0){
      queryParams.push(`conteudo=${filtro}`)
    }

    // if(favorito) {
    //   params = params.set('favorito', true)
    // }

    if(favorito){
      url += '/favoritos';
    } else { 
      let queryParams: string[] = [];
      if(filtro.trim().length > 0){
        queryParams.push(`conteudo=${filtro}`);
      }
    }

    const start = (pagina - 1) * 6;
    const end = start + 6;
    queryParams.push(`_start=${start}&_end=${end}`);

    if(queryParams.length > 0){
      url += `?${queryParams.join('&')}`;
    }

    return this.http.get<Pensamento[]>(url);
  }

  // listarPensamentosFavoritos(pagina: number, filtro: string): Observable<Pensamento[]>{
  //   const  itensPorPagina = 6;

  //   let params = new HttpParams()
  //   .set("_page", pagina)
  //   .set("_limit", itensPorPagina)
  //   .set("favorito", true)

  //   if(filtro.trim().length > 2){
  //     params = params.set("q", filtro)
  //   }

  //   return this.http.get<Pensamento[]>(this.API, { params })
  // }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

  excluir(id: string): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: string): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }
}
