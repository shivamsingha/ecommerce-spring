package ecommercespring.backend.product;

import ecommercespring.backend.discount.Discount;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.net.URI;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;
    private URI image;
    private double price;

    @OneToMany
    private Set<Discount> discounts;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;

    @CreatedBy
    private UUID createdBy;

    @LastModifiedBy
    private UUID modifiedBy;
}
