package com.douglas.memoteca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.douglas.memoteca.model.Pensamento;

public interface IPensamentoRepository extends JpaRepository<Pensamento, Long>{
	public List<Pensamento> findAllByConteudoContainingIgnoreCase(@Param("conteudo") String conteudo);
	public List<Pensamento> findAllByFavorito(boolean favorito);
	
	@Query("SELECT p FROM Pensamento p WHERE LOWER(p.conteudo) LIKE LOWER(CONCAT('%', :filtro, '%')) OR LOWER(p.autoria) LIKE LOWER(CONCAT('%', :filtro, '%'))")
	List<Pensamento> findByFiltro(@Param("filtro") String filtro);

}
