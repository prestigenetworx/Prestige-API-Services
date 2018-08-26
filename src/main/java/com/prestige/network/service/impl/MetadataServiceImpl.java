package com.prestige.network.service.impl;

import com.prestige.network.service.MetadataService;
import com.prestige.network.domain.Metadata;
import com.prestige.network.repository.MetadataRepository;
import com.prestige.network.service.dto.MetadataDTO;
import com.prestige.network.service.mapper.MetadataMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Metadata.
 */
@Service
@Transactional
public class MetadataServiceImpl implements MetadataService {

    private final Logger log = LoggerFactory.getLogger(MetadataServiceImpl.class);

    private final MetadataRepository metadataRepository;

    private final MetadataMapper metadataMapper;

    public MetadataServiceImpl(MetadataRepository metadataRepository, MetadataMapper metadataMapper) {
        this.metadataRepository = metadataRepository;
        this.metadataMapper = metadataMapper;
    }

    /**
     * Save a metadata.
     *
     * @param metadataDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MetadataDTO save(MetadataDTO metadataDTO) {
        log.debug("Request to save Metadata : {}", metadataDTO);
        Metadata metadata = metadataMapper.toEntity(metadataDTO);
        metadata = metadataRepository.save(metadata);
        return metadataMapper.toDto(metadata);
    }

    /**
     * Get all the metadata.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MetadataDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Metadata");
        return metadataRepository.findAll(pageable)
            .map(metadataMapper::toDto);
    }


    /**
     * Get one metadata by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MetadataDTO> findOne(Long id) {
        log.debug("Request to get Metadata : {}", id);
        return metadataRepository.findById(id)
            .map(metadataMapper::toDto);
    }

    /**
     * Delete the metadata by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Metadata : {}", id);
        metadataRepository.deleteById(id);
    }
}
