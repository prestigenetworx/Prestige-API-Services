package com.prestige.network.web.rest;

import com.prestige.network.PrestigeApp;

import com.prestige.network.domain.Blockchain;
import com.prestige.network.repository.BlockchainRepository;
import com.prestige.network.service.BlockchainService;
import com.prestige.network.service.dto.BlockchainDTO;
import com.prestige.network.service.mapper.BlockchainMapper;
import com.prestige.network.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.prestige.network.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BlockchainResource REST controller.
 *
 * @see BlockchainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestigeApp.class)
public class BlockchainResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_SYMBOL = "BBBBBBBBBB";

    @Autowired
    private BlockchainRepository blockchainRepository;


    @Autowired
    private BlockchainMapper blockchainMapper;
    

    @Autowired
    private BlockchainService blockchainService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlockchainMockMvc;

    private Blockchain blockchain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlockchainResource blockchainResource = new BlockchainResource(blockchainService);
        this.restBlockchainMockMvc = MockMvcBuilders.standaloneSetup(blockchainResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blockchain createEntity(EntityManager em) {
        Blockchain blockchain = new Blockchain()
            .name(DEFAULT_NAME)
            .symbol(DEFAULT_SYMBOL);
        return blockchain;
    }

    @Before
    public void initTest() {
        blockchain = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlockchain() throws Exception {
        int databaseSizeBeforeCreate = blockchainRepository.findAll().size();

        // Create the Blockchain
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(blockchain);
        restBlockchainMockMvc.perform(post("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isCreated());

        // Validate the Blockchain in the database
        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeCreate + 1);
        Blockchain testBlockchain = blockchainList.get(blockchainList.size() - 1);
        assertThat(testBlockchain.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBlockchain.getSymbol()).isEqualTo(DEFAULT_SYMBOL);
    }

    @Test
    @Transactional
    public void createBlockchainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blockchainRepository.findAll().size();

        // Create the Blockchain with an existing ID
        blockchain.setId(1L);
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(blockchain);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlockchainMockMvc.perform(post("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Blockchain in the database
        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = blockchainRepository.findAll().size();
        // set the field null
        blockchain.setName(null);

        // Create the Blockchain, which fails.
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(blockchain);

        restBlockchainMockMvc.perform(post("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isBadRequest());

        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSymbolIsRequired() throws Exception {
        int databaseSizeBeforeTest = blockchainRepository.findAll().size();
        // set the field null
        blockchain.setSymbol(null);

        // Create the Blockchain, which fails.
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(blockchain);

        restBlockchainMockMvc.perform(post("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isBadRequest());

        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBlockchains() throws Exception {
        // Initialize the database
        blockchainRepository.saveAndFlush(blockchain);

        // Get all the blockchainList
        restBlockchainMockMvc.perform(get("/api/blockchains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blockchain.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].symbol").value(hasItem(DEFAULT_SYMBOL.toString())));
    }
    

    @Test
    @Transactional
    public void getBlockchain() throws Exception {
        // Initialize the database
        blockchainRepository.saveAndFlush(blockchain);

        // Get the blockchain
        restBlockchainMockMvc.perform(get("/api/blockchains/{id}", blockchain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blockchain.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.symbol").value(DEFAULT_SYMBOL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBlockchain() throws Exception {
        // Get the blockchain
        restBlockchainMockMvc.perform(get("/api/blockchains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlockchain() throws Exception {
        // Initialize the database
        blockchainRepository.saveAndFlush(blockchain);

        int databaseSizeBeforeUpdate = blockchainRepository.findAll().size();

        // Update the blockchain
        Blockchain updatedBlockchain = blockchainRepository.findById(blockchain.getId()).get();
        // Disconnect from session so that the updates on updatedBlockchain are not directly saved in db
        em.detach(updatedBlockchain);
        updatedBlockchain
            .name(UPDATED_NAME)
            .symbol(UPDATED_SYMBOL);
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(updatedBlockchain);

        restBlockchainMockMvc.perform(put("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isOk());

        // Validate the Blockchain in the database
        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeUpdate);
        Blockchain testBlockchain = blockchainList.get(blockchainList.size() - 1);
        assertThat(testBlockchain.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBlockchain.getSymbol()).isEqualTo(UPDATED_SYMBOL);
    }

    @Test
    @Transactional
    public void updateNonExistingBlockchain() throws Exception {
        int databaseSizeBeforeUpdate = blockchainRepository.findAll().size();

        // Create the Blockchain
        BlockchainDTO blockchainDTO = blockchainMapper.toDto(blockchain);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlockchainMockMvc.perform(put("/api/blockchains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blockchainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Blockchain in the database
        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlockchain() throws Exception {
        // Initialize the database
        blockchainRepository.saveAndFlush(blockchain);

        int databaseSizeBeforeDelete = blockchainRepository.findAll().size();

        // Get the blockchain
        restBlockchainMockMvc.perform(delete("/api/blockchains/{id}", blockchain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Blockchain> blockchainList = blockchainRepository.findAll();
        assertThat(blockchainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Blockchain.class);
        Blockchain blockchain1 = new Blockchain();
        blockchain1.setId(1L);
        Blockchain blockchain2 = new Blockchain();
        blockchain2.setId(blockchain1.getId());
        assertThat(blockchain1).isEqualTo(blockchain2);
        blockchain2.setId(2L);
        assertThat(blockchain1).isNotEqualTo(blockchain2);
        blockchain1.setId(null);
        assertThat(blockchain1).isNotEqualTo(blockchain2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlockchainDTO.class);
        BlockchainDTO blockchainDTO1 = new BlockchainDTO();
        blockchainDTO1.setId(1L);
        BlockchainDTO blockchainDTO2 = new BlockchainDTO();
        assertThat(blockchainDTO1).isNotEqualTo(blockchainDTO2);
        blockchainDTO2.setId(blockchainDTO1.getId());
        assertThat(blockchainDTO1).isEqualTo(blockchainDTO2);
        blockchainDTO2.setId(2L);
        assertThat(blockchainDTO1).isNotEqualTo(blockchainDTO2);
        blockchainDTO1.setId(null);
        assertThat(blockchainDTO1).isNotEqualTo(blockchainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(blockchainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(blockchainMapper.fromId(null)).isNull();
    }
}
