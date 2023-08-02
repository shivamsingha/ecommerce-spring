package ecommercespring.backend.order;

import ecommercespring.backend.orderItem.OrderItem;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue
    private UUID id;

    @OneToMany
    private Set<OrderItem> orderItems;

    private String address;
    private double savings;
    private double shipping;
    private double tax;
    private double total;

    @Enumerated(EnumType.ORDINAL)
    private OrderStatus status;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;
}
