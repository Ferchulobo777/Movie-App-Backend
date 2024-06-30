package com.grupo11.Movie_App.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity // Indica que esta clase es una entidad JPA y se mapea a una tabla en la base de datos
@Data // Utiliza Lombok para generar automáticamente getters, setters, toString, etc.
@Table(name = "users") // Especifica el nombre de la tabla en la base de datos
public class User  {

    @Id // Indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria (autoincrementable en MySQL)
    private Long user_id; // Campo para almacenar el ID del usuario

    @NotEmpty(message = "Nombre es requerido") // La cadena no debe estar vacía
    @Size(min = 3, max = 50, message = "Nombre debe tener entre 3 y 50 caracteres") // Longitud mínima y máxima de la cadena
    @Column(name = "name", nullable = false, length = 50) // Mapea este campo a una columna en la tabla "name", no nulo y longitud máxima de 50 caracteres en la base de datos
    private String name; // Campo para almacenar el nombre del usuario

    @NotEmpty(message = "Apellido es requerido") // La cadena no debe estar vacía
    @Size(min = 2, max = 50, message = "Apellido debe tener entre 2 y 50 caracteres") // Longitud mínima y máxima de la cadena
    @Column(name = "last_name", nullable = false, length = 50) // Mapea este campo a una columna en la tabla "last_name", no nulo y longitud máxima de 50 caracteres en la base de datos
    private String lastName; // Campo para almacenar el apellido del usuario

    @Email(message = "Email debe ser valido") // Valida que el campo sea una dirección de correo electrónico válida
    @NotEmpty(message = "Email is required") // La cadena no debe estar vacía
    @Column(name = "email", unique = true, nullable = false) // Mapea este campo a una columna en la tabla "email", único (sin duplicados) y no nulo en la base de datos
    private String email; // Campo para almacenar el correo electrónico del usuario

    @NotEmpty(message = "Password es requerido") // La cadena no debe estar vacía
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") // Longitud mínima de la cadena
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial") // Expresión regular para validar la complejidad de la contraseña
    @Column(name = "password", nullable = false) // Mapea este campo a una columna en la tabla "password", no nulo en la base de datos
    private String password; // Campo para almacenar la contraseña del usuario

    @Column(name = "date_birthday") // Mapea este campo a una columna en la tabla "date_birthday" en la base de datos
    private LocalDate dateBirthday; // Campo para almacenar la fecha de nacimiento del usuario

    @NotEmpty(message = "Nacionalidad es requerida") // La cadena no debe estar vacía
    @Column(name = "nationality", nullable = false) // Mapea este campo a una columna en la tabla "nationality", no nulo en la base de datos
    private String nationality; // Campo para almacenar la nacionalidad del usuario
}