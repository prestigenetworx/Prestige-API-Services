package com.prestige.network.repository;

import com.prestige.network.domain.Business;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.prestige.network.domain.User;

/**
 * Spring Data  repository for the Business entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {

    @Query("select business from Business business where business.user.login = ?#{principal.username}")
    List<Business> findByUserIsCurrentUser();
    Page<Business> findByUserOrderById(User user, Pageable pageable);
    Optional<Business> findByUser(User user);
}
