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
    id: '',
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
        modelo: [''],
        favorito: [false]
      });
    
      const id = this.route.snapshot.paramMap.get('id');
    
      if(id) {
        this.service.buscarPorId(id).subscribe((pensamento: Pensamento) => {
          this.pensamento = pensamento;
    
          this.formulario.patchValue({
            conteudo: this.pensamento.conteudo,
            autoria: this.pensamento.autoria,
            modelo: this.pensamento.modelo,
            favorito: this.pensamento.favorito
          });
        }, error => {
          console.error('Erro ao buscar pensamento:', error);
        });
      } else {
        console.error('ID do pensamento não encontrado na rota');
      }
    }
  
  editarPensamento(): void {
      if (this.pensamento.id) {
        this.pensamento.conteudo = this.formulario.get('conteudo')?.value;
        this.pensamento.autoria = this.formulario.get('autoria')?.value;
        this.pensamento.modelo = this.formulario.get('modelo')?.value;
        this.pensamento.favorito = this.formulario.get('favorito')?.value;
    
        this.service.editar(this.pensamento).subscribe(() => {
          this.router.navigate(['/listarPensamento']);
        }, error => {
          console.error('Erro ao editar o pensamento:', error);
        });
      } else {
        console.error('Pensamento sem ID não pode ser editado');
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
