package com.prestige.network.repository;

import com.prestige.network.domain.Charge;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Charge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChargeRepository extends JpaRepository<Charge, Long> {

}
