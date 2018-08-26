package com.prestige.network.service;

import com.prestige.network.service.dto.ChargeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Charge.
 */
public interface ChargeService {

    /**
     * Save a charge.
     *
     * @param chargeDTO the entity to save
     * @return the persisted entity
     */
    ChargeDTO save(ChargeDTO chargeDTO);

    /**
     * Get all the charges.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChargeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" charge.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ChargeDTO> findOne(Long id);

    /**
     * Delete the "id" charge.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
