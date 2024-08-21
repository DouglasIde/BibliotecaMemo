package com.douglas.memoteca.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Entity
@Table(name = "tb_pensamentos")
@Data
public class Pensamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "O atributo conteúdo é obrigatório")
	@Size(min = 5, message = "O atributo conteúdo deve conter no mínimo 5 caracteres")
	private String conteudo;
	
	@NotBlank(message = "O atributo autoria é obrigatório")
	@Size(min = 2, message = "O atributo autoria deve conter no mínimo 2 caracteres")
	private String autoria;
	
	@NotBlank(message = "O atributo modelo é obrigatório")
	private String modelo;
	
	@NotBlank(message = "O atributo favorito é obrigatório")
	private Boolean favorito;
}
