package com.grupo11.Movie_App;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://ferchulobo777-movie-app.netlify.app", "http://127.0.0.1:5500")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}