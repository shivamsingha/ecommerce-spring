package ecommercespring.backend.productCategory;

import ecommercespring.backend.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
public class ProductCategory {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String description;

    @OneToMany
    private Set<Product> products;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;
}
