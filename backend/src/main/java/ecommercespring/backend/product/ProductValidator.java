package ecommercespring.backend.product;

import org.springframework.lang.NonNull;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class ProductValidator implements Validator {
    @Override
    public boolean supports(@NonNull Class<?> clazz) {
        return Product.class.equals(clazz);
    }

    @Override
    public void validate(@NonNull Object obj, @NonNull Errors errors) {
        Product product = (Product) obj;
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            errors.rejectValue("name", "name.empty", "Name must not be empty");
        }
        if (product.getPrice() < 0) {
            errors.rejectValue("price", "price.negative", "Price must be positive");
        }
    }
}