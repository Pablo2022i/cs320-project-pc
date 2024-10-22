package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_names")
public class UserName extends PanacheEntity {
    public String first;
    public String last;
    public String phone;
    public String email;
    public String message;

    public UserName() {}

    public UserName(String first, String last, String phone, String email, String message) {
        this.first = first;
        this.last = last;
        this.phone = phone;
        this.email = email;
        this.message = message;
    }

    @Override
    public String toString() {
        return first + " " + last;
    }
}
