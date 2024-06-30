package com.grupo11.Movie_App.service;

import com.grupo11.Movie_App.model.User;
import com.grupo11.Movie_App.repository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final Argon2 argon2;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public User updateUser(User user) {
        // Check if the user exists
        Optional<User> existingUserOpt = userRepository.findById(user.getUser_id());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            // Update other fields as needed
            return userRepository.save(existingUser);
        } else {
            // Handle case where user to update does not exist
            throw new IllegalArgumentException("User not found with id: " + user.getUser_id());
        }
    }
}