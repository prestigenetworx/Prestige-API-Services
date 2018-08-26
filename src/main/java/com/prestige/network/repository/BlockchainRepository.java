package com.prestige.network.repository;

import com.prestige.network.domain.Blockchain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Blockchain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlockchainRepository extends JpaRepository<Blockchain, Long> {

}
