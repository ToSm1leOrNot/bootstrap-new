package com.example.demo.service;

import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findById (long id) {
        Optional<User> userById = userRepository.findById(id);
        userById.orElseThrow(() -> new UsernameNotFoundException(String.format("User with id %s not found", id)));
        return userById.get();
    }

    @Override
    @Transactional
    public void addUser (User newUser) {
        newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
        userRepository.save(newUser);
    }


    @Override
    @Transactional
    public void deleteUser (long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateUser (long id, User userForUpdate) {
//        User userToBeUpdated = findById(id);
//        if(userToBeUpdated != null && !Objects.equals(userToBeUpdated.getPassword(), userForUpdate.getPassword())) {
//            userForUpdate.setPassword(passwordEncoder.encode(userForUpdate.getPassword()));
//        }
//        userForUpdate.setId(id);
//        userRepository.save(userForUpdate);
        if (!findById(id).getPassword().equals(userForUpdate.getPassword())) {
            userForUpdate.setPassword(new BCryptPasswordEncoder().encode(userForUpdate.getPassword()));
        }
        userRepository.saveAndFlush(userForUpdate);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null ) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities (Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole())).collect(Collectors.toList());
    }
}
