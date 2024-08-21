package com.douglas.memoteca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douglas.memoteca.model.Pensamento;
import com.douglas.memoteca.repository.IPensamentoRepository;

@RestController
@RequestMapping("/pensamentos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PensamentoController {

	@Autowired
	private IPensamentoRepository pensamentoRepository;
	
	@GetMapping
	public ResponseEntity<List<Pensamento>> getAll(){
		return ResponseEntity.ok(pensamentoRepository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Pensamento> getById(@PathVariable Long id){
		return pensamentoRepository.findById(id)
				.map(resposta -> ResponseEntity.ok(resposta))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}
}
