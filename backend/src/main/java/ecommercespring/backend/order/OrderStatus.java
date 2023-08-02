package ecommercespring.backend.order;

public enum OrderStatus {
    PENDING,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    RETURN_REQUESTED,
    RETURNED,
    REFUND_PROCESSING,
    REFUNDED
}
