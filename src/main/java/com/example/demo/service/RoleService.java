package com.example.demo.service;

import com.example.demo.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRole();

    public Role addRole (Role role);

    Role roleById (Long id);
}
