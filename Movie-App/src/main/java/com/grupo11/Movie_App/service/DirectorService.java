package com.grupo11.Movie_App.service;

import com.grupo11.Movie_App.model.Director;
import com.grupo11.Movie_App.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DirectorService {
    private final DirectorRepository directorRepository;

    @Autowired
    public DirectorService(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    public List<Director> getAllDirectors() {
        return directorRepository.findAll();
    }

    public Optional<Director> getById(Long directorId) {
        return directorRepository.findById(directorId);
    }

    public Director saveDirector(Director director) {
        return directorRepository.save(director);
    }

    public void deleteDirector(Long directorId) {
        directorRepository.deleteById(directorId);
    }

    public Director updateDirector(Long directorId, Director directorDetails) {
        Optional<Director> optionalDirector = directorRepository.findById(directorId);

        if (optionalDirector.isPresent()) {
            Director existingDirector = optionalDirector.get();

            // Actualiza los campos del director existente con los nuevos detalles
            existingDirector.setName(directorDetails.getName());
            existingDirector.setLastname(directorDetails.getLastname());
            existingDirector.setAge(directorDetails.getAge());
            existingDirector.setDateOfBirth(directorDetails.getDateOfBirth());
            existingDirector.setDateOfDeath(directorDetails.getDateOfDeath());
            existingDirector.setNationality(directorDetails.getNationality());

            // Guarda el director actualizado en el repositorio
            return directorRepository.save(existingDirector);
        } else {
            throw new RuntimeException("Director no encontrado con ID: " + directorId);
        }
    }
}