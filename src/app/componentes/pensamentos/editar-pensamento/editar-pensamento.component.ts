import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../../minusculoValidator/minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.scss'
})
export class EditarPensamentoComponent {

  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder
  ){ }

  ngOnInit(): void{
    this.formulario = this.FormBuilder.group({
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
      modelo: [this.pensamento.modelo],
      favorito: [this.pensamento.favorito]
    })
    }
  

  editarPensamento(){
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
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
