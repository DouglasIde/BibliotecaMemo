package com.douglas.memoteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.douglas.memoteca.model.Pensamento;

public interface IPensamentoRepository extends JpaRepository<Pensamento, Long>{

}
