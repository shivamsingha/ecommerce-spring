package ecommercespring.backend.discount;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Discount {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;
    private double discountPercentage;
    private int minimumQuantity;
    private int maximumQuantity;
    private int availableQuantity;
    private boolean isActive;

    private Date startDate;
    private Date endDate;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;
}
