package com.grupo11.Movie_App.controller;

import com.grupo11.Movie_App.model.Movie;
import com.grupo11.Movie_App.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "https://ferchulobo777-movie-app.vercel.app")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.findAll();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.findById(id);
        if (movie == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(movie);
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(
            @Valid @RequestBody Movie movie) {

        try {
            Movie savedMovie = movieService.save(movie);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable Long id,
            @Valid @RequestBody Movie updatedMovieData) {

        Movie existingMovie = movieService.findById(id);
        if (existingMovie == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            // Mantener los valores actuales si no se proporcionan nuevos
            if (updatedMovieData.getPoster() == null) {
                updatedMovieData.setPoster(existingMovie.getPoster());
            }
            if (updatedMovieData.getWallpaper() == null) {
                updatedMovieData.setWallpaper(existingMovie.getWallpaper());
            }

            Movie updatedMovie = movieService.update(id, updatedMovieData);
            return ResponseEntity.ok(updatedMovie);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}