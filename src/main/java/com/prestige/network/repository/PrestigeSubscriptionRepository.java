package com.prestige.network.repository;

import com.prestige.network.domain.PrestigeSubscription;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrestigeSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrestigeSubscriptionRepository extends JpaRepository<PrestigeSubscription, Long> {

}
