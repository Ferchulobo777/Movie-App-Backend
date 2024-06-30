package com.grupo11.Movie_App.service;

import com.grupo11.Movie_App.model.Movie;
import com.grupo11.Movie_App.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

    public Movie findById(Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.orElse(null);
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie update(Long id, Movie movieDetails) {
        Movie existingMovie = findById(id);
        if (existingMovie == null) {
            return null;
        }

        // Update fields
        existingMovie.setTitle(movieDetails.getTitle());
        existingMovie.setYear(movieDetails.getYear());
        existingMovie.setDatetime(movieDetails.getDatetime());
        existingMovie.setGenre(movieDetails.getGenre());
        existingMovie.setOverview(movieDetails.getOverview());
        existingMovie.setDirector(movieDetails.getDirector());
        existingMovie.setPoster(movieDetails.getPoster());
        existingMovie.setWallpaper(movieDetails.getWallpaper());
        existingMovie.setTrailer(movieDetails.getTrailer());
        existingMovie.setSocialLinks(movieDetails.getSocialLinks());
        existingMovie.setWebsite(movieDetails.getWebsite());
        existingMovie.setStatus(movieDetails.getStatus());
        existingMovie.setOriginalLanguage(movieDetails.getOriginalLanguage());
        existingMovie.setBudget(movieDetails.getBudget());
        existingMovie.setRevenue(movieDetails.getRevenue());

        return movieRepository.save(existingMovie);
    }

    public void deleteById(Long id) {
        movieRepository.deleteById(id);
    }
}