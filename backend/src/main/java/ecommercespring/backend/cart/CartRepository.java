package ecommercespring.backend.cart;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {

    @Query("select c from Cart c where c.createdBy = ?#{ principal?.claims?.get('sub') }")
    Page<Cart> findAll(Pageable pageable);
}
