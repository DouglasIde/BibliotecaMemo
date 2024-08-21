package com.douglas.memoteca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douglas.memoteca.repository.IPensamentoRepository;

@RestController
@RequestMapping("/pensamentos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PensamentoController {

	@Autowired
	private IPensamentoRepository pensamentoRepository;
}
