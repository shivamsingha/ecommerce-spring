package ecommercespring.backend.user;

import ecommercespring.backend.order.Order;
import ecommercespring.backend.product.Product;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String address;

    private String email;
    private String phone;

    @OneToMany
    private Set<Product> cartItems;

    @OneToMany
    private Set<Order> orders;
}
