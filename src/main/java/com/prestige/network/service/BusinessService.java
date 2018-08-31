package com.prestige.network.service;

import com.prestige.network.domain.User;
import com.prestige.network.service.dto.BusinessDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Business.
 */
public interface BusinessService {

    /**
     * Save a business.
     *
     * @param businessDTO the entity to save
     * @return the persisted entity
     */
    BusinessDTO save(BusinessDTO businessDTO);

    /**
     * Get all the businesses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BusinessDTO> findAll(Pageable pageable);

    /**
     * Get all the businesses by getcurrentuser.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BusinessDTO> findAllById(User user, Pageable pageable);


    /**
     * Get the "id" business.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BusinessDTO> findOne(Long id);

    /**
     * Delete the "id" business.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
