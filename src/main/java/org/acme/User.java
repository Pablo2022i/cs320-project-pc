package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {
    
    @Column(nullable = false, unique = true)
    public String email;
    
    @Column(nullable = false)
    public String password;  // Store the hashed password

    public String firstName;
    public String lastName;
    
    @Column(nullable = false)
    public boolean isAdmin;

    // Default constructor
    public User() {}

    // Constructor with fields
    public User(String email, String password, String firstName, String lastName, boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
    }
}
