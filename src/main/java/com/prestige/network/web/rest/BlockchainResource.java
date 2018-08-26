package com.prestige.network.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.prestige.network.service.BlockchainService;
import com.prestige.network.web.rest.errors.BadRequestAlertException;
import com.prestige.network.web.rest.util.HeaderUtil;
import com.prestige.network.web.rest.util.PaginationUtil;
import com.prestige.network.service.dto.BlockchainDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blockchain.
 */
@RestController
@RequestMapping("/api")
public class BlockchainResource {

    private final Logger log = LoggerFactory.getLogger(BlockchainResource.class);

    private static final String ENTITY_NAME = "blockchain";

    private final BlockchainService blockchainService;

    public BlockchainResource(BlockchainService blockchainService) {
        this.blockchainService = blockchainService;
    }

    /**
     * POST  /blockchains : Create a new blockchain.
     *
     * @param blockchainDTO the blockchainDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blockchainDTO, or with status 400 (Bad Request) if the blockchain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blockchains")
    @Timed
    public ResponseEntity<BlockchainDTO> createBlockchain(@Valid @RequestBody BlockchainDTO blockchainDTO) throws URISyntaxException {
        log.debug("REST request to save Blockchain : {}", blockchainDTO);
        if (blockchainDTO.getId() != null) {
            throw new BadRequestAlertException("A new blockchain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlockchainDTO result = blockchainService.save(blockchainDTO);
        return ResponseEntity.created(new URI("/api/blockchains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blockchains : Updates an existing blockchain.
     *
     * @param blockchainDTO the blockchainDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blockchainDTO,
     * or with status 400 (Bad Request) if the blockchainDTO is not valid,
     * or with status 500 (Internal Server Error) if the blockchainDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blockchains")
    @Timed
    public ResponseEntity<BlockchainDTO> updateBlockchain(@Valid @RequestBody BlockchainDTO blockchainDTO) throws URISyntaxException {
        log.debug("REST request to update Blockchain : {}", blockchainDTO);
        if (blockchainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlockchainDTO result = blockchainService.save(blockchainDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blockchainDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blockchains : get all the blockchains.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blockchains in body
     */
    @GetMapping("/blockchains")
    @Timed
    public ResponseEntity<List<BlockchainDTO>> getAllBlockchains(Pageable pageable) {
        log.debug("REST request to get a page of Blockchains");
        Page<BlockchainDTO> page = blockchainService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blockchains");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blockchains/:id : get the "id" blockchain.
     *
     * @param id the id of the blockchainDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blockchainDTO, or with status 404 (Not Found)
     */
    @GetMapping("/blockchains/{id}")
    @Timed
    public ResponseEntity<BlockchainDTO> getBlockchain(@PathVariable Long id) {
        log.debug("REST request to get Blockchain : {}", id);
        Optional<BlockchainDTO> blockchainDTO = blockchainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(blockchainDTO);
    }

    /**
     * DELETE  /blockchains/:id : delete the "id" blockchain.
     *
     * @param id the id of the blockchainDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blockchains/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlockchain(@PathVariable Long id) {
        log.debug("REST request to delete Blockchain : {}", id);
        blockchainService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
