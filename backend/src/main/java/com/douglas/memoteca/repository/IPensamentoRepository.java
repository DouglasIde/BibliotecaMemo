package com.douglas.memoteca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.douglas.memoteca.model.Pensamento;

public interface IPensamentoRepository extends JpaRepository<Pensamento, Long>{
	public List<Pensamento> findAllByConteudoContainingIgnoreCase(@Param("conteudo") String conteudo);
}
