package com.grupo11.Movie_App.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movie_id;

    @NotEmpty(message = "Title is required")
    @Size(min = 1, max = 100, message = "Title must be between 1 and 100 characters")
    @Column(nullable = false, length = 100)
    private String title;

    @NotNull(message = "Year is required")
    @Column(nullable = false)
    private Integer year;

    @NotNull(message = "Datetime is required")
    @Column(nullable = false)
    private LocalDate datetime;

    @ElementCollection
    private List<String> genre;

    @NotEmpty(message = "Overview is required")
    @Column(nullable = false, length = 1000)
    private String overview;

    @ManyToOne
    @JoinColumn(name = "director_id", nullable = false)
    private Director director;

    private String poster;
    private String wallpaper;
    private String trailer;

    @ElementCollection
    private List<String> socialLinks;

    private String website;
    private Boolean status;
    private String originalLanguage;
    private Double budget;
    private Double revenue;
}