package ecommercespring.backend.order;

import ecommercespring.backend.orderItem.OrderItem;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
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
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(nullable = false)
    private String modifiedBy;
}
