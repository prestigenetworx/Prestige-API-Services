package com.prestige.network.service.impl;

import com.prestige.network.service.BlockchainService;
import com.prestige.network.domain.Blockchain;
import com.prestige.network.repository.BlockchainRepository;
import com.prestige.network.service.dto.BlockchainDTO;
import com.prestige.network.service.mapper.BlockchainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Blockchain.
 */
@Service
@Transactional
public class BlockchainServiceImpl implements BlockchainService {

    private final Logger log = LoggerFactory.getLogger(BlockchainServiceImpl.class);

    private final BlockchainRepository blockchainRepository;

    private final BlockchainMapper blockchainMapper;

    public BlockchainServiceImpl(BlockchainRepository blockchainRepository, BlockchainMapper blockchainMapper) {
        this.blockchainRepository = blockchainRepository;
        this.blockchainMapper = blockchainMapper;
    }

    /**
     * Save a blockchain.
     *
     * @param blockchainDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BlockchainDTO save(BlockchainDTO blockchainDTO) {
        log.debug("Request to save Blockchain : {}", blockchainDTO);
        Blockchain blockchain = blockchainMapper.toEntity(blockchainDTO);
        blockchain = blockchainRepository.save(blockchain);
        return blockchainMapper.toDto(blockchain);
    }

    /**
     * Get all the blockchains.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BlockchainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Blockchains");
        return blockchainRepository.findAll(pageable)
            .map(blockchainMapper::toDto);
    }


    /**
     * Get one blockchain by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BlockchainDTO> findOne(Long id) {
        log.debug("Request to get Blockchain : {}", id);
        return blockchainRepository.findById(id)
            .map(blockchainMapper::toDto);
    }

    /**
     * Delete the blockchain by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Blockchain : {}", id);
        blockchainRepository.deleteById(id);
    }
}
