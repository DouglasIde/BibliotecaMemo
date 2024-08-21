package com.douglas.memoteca.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "tb_pensamentos")
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
	
	@NotNull(message = "O atributo favorito não pode ser nulo")
	private Boolean favorito;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConteudo() {
		return conteudo;
	}

	public void setConteudo(String conteudo) {
		this.conteudo = conteudo;
	}

	public String getAutoria() {
		return autoria;
	}

	public void setAutoria(String autoria) {
		this.autoria = autoria;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public Boolean getFavorito() {
		return favorito;
	}

	public void setFavorito(Boolean favorito) {
		this.favorito = favorito;
	}
	
	
	
}
