package com.prestige.network.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.prestige.network.service.PrestigeSubscriptionService;
import com.prestige.network.web.rest.errors.BadRequestAlertException;
import com.prestige.network.web.rest.util.HeaderUtil;
import com.prestige.network.web.rest.util.PaginationUtil;
import com.prestige.network.service.dto.PrestigeSubscriptionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PrestigeSubscription.
 */
@RestController
@RequestMapping("/api")
public class PrestigeSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(PrestigeSubscriptionResource.class);

    private static final String ENTITY_NAME = "prestigeSubscription";

    private final PrestigeSubscriptionService prestigeSubscriptionService;

    public PrestigeSubscriptionResource(PrestigeSubscriptionService prestigeSubscriptionService) {
        this.prestigeSubscriptionService = prestigeSubscriptionService;
    }

    /**
     * POST  /prestige-subscriptions : Create a new prestigeSubscription.
     *
     * @param prestigeSubscriptionDTO the prestigeSubscriptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prestigeSubscriptionDTO, or with status 400 (Bad Request) if the prestigeSubscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prestige-subscriptions")
    @Timed
    public ResponseEntity<PrestigeSubscriptionDTO> createPrestigeSubscription(@RequestBody PrestigeSubscriptionDTO prestigeSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to save PrestigeSubscription : {}", prestigeSubscriptionDTO);
        if (prestigeSubscriptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new prestigeSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrestigeSubscriptionDTO result = prestigeSubscriptionService.save(prestigeSubscriptionDTO);
        return ResponseEntity.created(new URI("/api/prestige-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prestige-subscriptions : Updates an existing prestigeSubscription.
     *
     * @param prestigeSubscriptionDTO the prestigeSubscriptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prestigeSubscriptionDTO,
     * or with status 400 (Bad Request) if the prestigeSubscriptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the prestigeSubscriptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prestige-subscriptions")
    @Timed
    public ResponseEntity<PrestigeSubscriptionDTO> updatePrestigeSubscription(@RequestBody PrestigeSubscriptionDTO prestigeSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to update PrestigeSubscription : {}", prestigeSubscriptionDTO);
        if (prestigeSubscriptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrestigeSubscriptionDTO result = prestigeSubscriptionService.save(prestigeSubscriptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prestigeSubscriptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prestige-subscriptions : get all the prestigeSubscriptions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of prestigeSubscriptions in body
     */
    @GetMapping("/prestige-subscriptions")
    @Timed
    public ResponseEntity<List<PrestigeSubscriptionDTO>> getAllPrestigeSubscriptions(Pageable pageable) {
        log.debug("REST request to get a page of PrestigeSubscriptions");
        Page<PrestigeSubscriptionDTO> page = prestigeSubscriptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prestige-subscriptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /prestige-subscriptions/:id : get the "id" prestigeSubscription.
     *
     * @param id the id of the prestigeSubscriptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prestigeSubscriptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/prestige-subscriptions/{id}")
    @Timed
    public ResponseEntity<PrestigeSubscriptionDTO> getPrestigeSubscription(@PathVariable Long id) {
        log.debug("REST request to get PrestigeSubscription : {}", id);
        Optional<PrestigeSubscriptionDTO> prestigeSubscriptionDTO = prestigeSubscriptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(prestigeSubscriptionDTO);
    }

    /**
     * DELETE  /prestige-subscriptions/:id : delete the "id" prestigeSubscription.
     *
     * @param id the id of the prestigeSubscriptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prestige-subscriptions/{id}")
    @Timed
    public ResponseEntity<Void> deletePrestigeSubscription(@PathVariable Long id) {
        log.debug("REST request to delete PrestigeSubscription : {}", id);
        prestigeSubscriptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
