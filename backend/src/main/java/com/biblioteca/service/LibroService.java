package com.biblioteca.service;

import com.biblioteca.model.Libro;
import com.biblioteca.repository.LibroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LibroService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LibroService.class);

    private final LibroRepository repository;

    public LibroService(LibroRepository repository) {
        this.repository = repository;
    }

    public List<Libro> listar() {
        return repository.findAll();
    }

    public List<Libro> buscarPorTitulo(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public Libro guardar(Libro libro) {
        LOGGER.info("Guardando libro: {}", libro.getTitulo());
        return repository.save(libro);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
