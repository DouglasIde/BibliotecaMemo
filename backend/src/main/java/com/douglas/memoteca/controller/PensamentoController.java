package com.douglas.memoteca.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.douglas.memoteca.model.Pensamento;
import com.douglas.memoteca.repository.IPensamentoRepository;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/pensamentos")
@CrossOrigin(origins = "*")
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
	
	@GetMapping("/conteudo/{conteudo}")
	public ResponseEntity<List<Pensamento>> getByConteudo(@PathVariable String conteudo){
		return ResponseEntity.ok(pensamentoRepository.findAllByConteudoContainingIgnoreCase(conteudo));
	}
	
	@PostMapping
	public ResponseEntity<Pensamento> post(@Valid @RequestBody Pensamento pensamento){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(pensamentoRepository.save(pensamento));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Pensamento> put(@PathVariable Long id, @Valid @RequestBody Pensamento pensamento){
	    return pensamentoRepository.findById(id)
	            .map(resposta -> {
	                pensamento.setId(id); // 
	                return ResponseEntity.status(HttpStatus.OK)
	                    .body(pensamentoRepository.save(pensamento));
	            })
	            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());	
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		Optional<Pensamento> pensamento = pensamentoRepository.findById(id);
		
		if(pensamento.isEmpty())
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		pensamentoRepository.deleteById(id);
	}
}

