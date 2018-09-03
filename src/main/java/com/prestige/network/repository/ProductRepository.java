package com.prestige.network.repository;

import com.prestige.network.domain.Product;
import com.prestige.network.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser();
    Page<Product> findByUserOrderById(User user, Pageable pageable);



}
