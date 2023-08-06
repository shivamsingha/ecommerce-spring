package ecommercespring.backend.product;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductValidationConfig {
    @Bean
    public ProductValidator beforeCreateProductValidator() {
        return new ProductValidator();
    }
}
