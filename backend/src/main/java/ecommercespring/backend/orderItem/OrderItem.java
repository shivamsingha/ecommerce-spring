package ecommercespring.backend.orderItem;

import ecommercespring.backend.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    private Product product;

    private int quantity;
    private double costAtPurchase;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;
}
