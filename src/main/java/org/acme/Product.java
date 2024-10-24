package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "products")  // Entity for MySQL
public class Product extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    public String description;

    @Column(nullable = false)
    public BigDecimal price;  // Prices, boolean

    public String img;

    @Column(nullable = false)
    public int quantity;  // Include quantity for stock

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
    public Timestamp created_at;  // Automatically filled when the row is created

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    public Timestamp updated_at;  // Automatically updated when the row is modified

    // Default constructor
    public Product() {}

    // Constructor with fields
    public Product(String name, String description, BigDecimal price, String img, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
    }
}
