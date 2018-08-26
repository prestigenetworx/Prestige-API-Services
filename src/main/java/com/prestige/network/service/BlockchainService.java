package com.prestige.network.service;

import com.prestige.network.service.dto.BlockchainDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Blockchain.
 */
public interface BlockchainService {

    /**
     * Save a blockchain.
     *
     * @param blockchainDTO the entity to save
     * @return the persisted entity
     */
    BlockchainDTO save(BlockchainDTO blockchainDTO);

    /**
     * Get all the blockchains.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BlockchainDTO> findAll(Pageable pageable);


    /**
     * Get the "id" blockchain.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BlockchainDTO> findOne(Long id);

    /**
     * Delete the "id" blockchain.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
