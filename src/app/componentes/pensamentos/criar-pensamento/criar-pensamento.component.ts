import { Component, OnInit } from '@angular/core';
import { Pensamento } from './../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { EditarPensamentoComponent } from '../editar-pensamento/editar-pensamento.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../../minusculoValidator/minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(5)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator
      ])],
      modelo: ['modelo1']
    })
  }

  criarPensamento(){
    console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      });
    }
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(){
    if(this.formulario.valid){
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
