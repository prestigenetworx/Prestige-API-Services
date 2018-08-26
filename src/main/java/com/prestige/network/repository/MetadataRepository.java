package com.prestige.network.repository;

import com.prestige.network.domain.Metadata;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Metadata entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetadataRepository extends JpaRepository<Metadata, Long> {

}
