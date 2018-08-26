package com.prestige.network.service.impl;

import com.prestige.network.service.PrestigeSubscriptionService;
import com.prestige.network.domain.PrestigeSubscription;
import com.prestige.network.repository.PrestigeSubscriptionRepository;
import com.prestige.network.service.dto.PrestigeSubscriptionDTO;
import com.prestige.network.service.mapper.PrestigeSubscriptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing PrestigeSubscription.
 */
@Service
@Transactional
public class PrestigeSubscriptionServiceImpl implements PrestigeSubscriptionService {

    private final Logger log = LoggerFactory.getLogger(PrestigeSubscriptionServiceImpl.class);

    private final PrestigeSubscriptionRepository prestigeSubscriptionRepository;

    private final PrestigeSubscriptionMapper prestigeSubscriptionMapper;

    public PrestigeSubscriptionServiceImpl(PrestigeSubscriptionRepository prestigeSubscriptionRepository, PrestigeSubscriptionMapper prestigeSubscriptionMapper) {
        this.prestigeSubscriptionRepository = prestigeSubscriptionRepository;
        this.prestigeSubscriptionMapper = prestigeSubscriptionMapper;
    }

    /**
     * Save a prestigeSubscription.
     *
     * @param prestigeSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PrestigeSubscriptionDTO save(PrestigeSubscriptionDTO prestigeSubscriptionDTO) {
        log.debug("Request to save PrestigeSubscription : {}", prestigeSubscriptionDTO);
        PrestigeSubscription prestigeSubscription = prestigeSubscriptionMapper.toEntity(prestigeSubscriptionDTO);
        prestigeSubscription = prestigeSubscriptionRepository.save(prestigeSubscription);
        return prestigeSubscriptionMapper.toDto(prestigeSubscription);
    }

    /**
     * Get all the prestigeSubscriptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PrestigeSubscriptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PrestigeSubscriptions");
        return prestigeSubscriptionRepository.findAll(pageable)
            .map(prestigeSubscriptionMapper::toDto);
    }


    /**
     * Get one prestigeSubscription by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PrestigeSubscriptionDTO> findOne(Long id) {
        log.debug("Request to get PrestigeSubscription : {}", id);
        return prestigeSubscriptionRepository.findById(id)
            .map(prestigeSubscriptionMapper::toDto);
    }

    /**
     * Delete the prestigeSubscription by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PrestigeSubscription : {}", id);
        prestigeSubscriptionRepository.deleteById(id);
    }
}
