package com.prestige.network.service;

import com.prestige.network.service.dto.PrestigeSubscriptionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PrestigeSubscription.
 */
public interface PrestigeSubscriptionService {

    /**
     * Save a prestigeSubscription.
     *
     * @param prestigeSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    PrestigeSubscriptionDTO save(PrestigeSubscriptionDTO prestigeSubscriptionDTO);

    /**
     * Get all the prestigeSubscriptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PrestigeSubscriptionDTO> findAll(Pageable pageable);


    /**
     * Get the "id" prestigeSubscription.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PrestigeSubscriptionDTO> findOne(Long id);

    /**
     * Delete the "id" prestigeSubscription.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
