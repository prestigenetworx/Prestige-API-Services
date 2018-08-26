package com.prestige.network.service;

import com.prestige.network.service.dto.MetadataDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Metadata.
 */
public interface MetadataService {

    /**
     * Save a metadata.
     *
     * @param metadataDTO the entity to save
     * @return the persisted entity
     */
    MetadataDTO save(MetadataDTO metadataDTO);

    /**
     * Get all the metadata.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MetadataDTO> findAll(Pageable pageable);


    /**
     * Get the "id" metadata.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MetadataDTO> findOne(Long id);

    /**
     * Delete the "id" metadata.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
