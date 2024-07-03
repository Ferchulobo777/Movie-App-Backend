package com.grupo11.Movie_App.controller;

import com.grupo11.Movie_App.model.User;
import com.grupo11.Movie_App.service.AuthService;
import com.grupo11.Movie_App.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://ferchulobo777-movie-app.vercel.app")
public class AuthController {

    private final AuthService authService;
    private final JWTUtil jwtUtil;

    @Autowired
    public AuthController(AuthService authService, JWTUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOpt = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (userOpt.isPresent()) {
            String token = jwtUtil.create(String.valueOf(userOpt.get().getUser_id()), userOpt.get().getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}