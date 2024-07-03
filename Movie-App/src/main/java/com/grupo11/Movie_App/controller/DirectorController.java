package com.grupo11.Movie_App.controller;

import com.grupo11.Movie_App.model.Director;
import com.grupo11.Movie_App.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/directors")
@CrossOrigin(origins = "https://ferchulobo777-movie-app.vercel.app/")
public class DirectorController {

    private final DirectorService directorService;

    @Autowired
    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping
    public List<Director> getAllDirectors() {
        return directorService.getAllDirectors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Director> getDirectorById(@PathVariable Long id) {
        return directorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Director createDirector(@RequestBody Director director) {
        return directorService.saveDirector(director);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Director> updateDirector(@PathVariable Long id, @RequestBody Director directorDetails) {
        try {
            Director updatedDirector = directorService.updateDirector(id, directorDetails);
            return ResponseEntity.ok(updatedDirector);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDirector(@PathVariable Long id) {
        directorService.deleteDirector(id);
        return ResponseEntity.noContent().build();
    }
}