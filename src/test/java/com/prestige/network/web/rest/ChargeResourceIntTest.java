package com.prestige.network.web.rest;

import com.prestige.network.PrestigeApp;

import com.prestige.network.domain.Charge;
import com.prestige.network.repository.ChargeRepository;
import com.prestige.network.service.ChargeService;
import com.prestige.network.service.dto.ChargeDTO;
import com.prestige.network.service.mapper.ChargeMapper;
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
 * Test class for the ChargeResource REST controller.
 *
 * @see ChargeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestigeApp.class)
public class ChargeResourceIntTest {

    private static final Long DEFAULT_AMOUNT = 0L;
    private static final Long UPDATED_AMOUNT = 1L;

    private static final String DEFAULT_TRANSACTION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_FROM = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_FROM = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_TO = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_TO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_COMPLETED = false;
    private static final Boolean UPDATED_COMPLETED = true;

    private static final String DEFAULT_BLOCKCHAIN_TX = "AAAAAAAAAA";
    private static final String UPDATED_BLOCKCHAIN_TX = "BBBBBBBBBB";

    @Autowired
    private ChargeRepository chargeRepository;


    @Autowired
    private ChargeMapper chargeMapper;
    

    @Autowired
    private ChargeService chargeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChargeMockMvc;

    private Charge charge;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChargeResource chargeResource = new ChargeResource(chargeService);
        this.restChargeMockMvc = MockMvcBuilders.standaloneSetup(chargeResource)
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
    public static Charge createEntity(EntityManager em) {
        Charge charge = new Charge()
            .amount(DEFAULT_AMOUNT)
            .transaction(DEFAULT_TRANSACTION)
            .description(DEFAULT_DESCRIPTION)
            .addressFrom(DEFAULT_ADDRESS_FROM)
            .addressTo(DEFAULT_ADDRESS_TO)
            .completed(DEFAULT_COMPLETED)
            .blockchainTx(DEFAULT_BLOCKCHAIN_TX);
        return charge;
    }

    @Before
    public void initTest() {
        charge = createEntity(em);
    }

    @Test
    @Transactional
    public void createCharge() throws Exception {
        int databaseSizeBeforeCreate = chargeRepository.findAll().size();

        // Create the Charge
        ChargeDTO chargeDTO = chargeMapper.toDto(charge);
        restChargeMockMvc.perform(post("/api/charges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chargeDTO)))
            .andExpect(status().isCreated());

        // Validate the Charge in the database
        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeCreate + 1);
        Charge testCharge = chargeList.get(chargeList.size() - 1);
        assertThat(testCharge.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCharge.getTransaction()).isEqualTo(DEFAULT_TRANSACTION);
        assertThat(testCharge.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCharge.getAddressFrom()).isEqualTo(DEFAULT_ADDRESS_FROM);
        assertThat(testCharge.getAddressTo()).isEqualTo(DEFAULT_ADDRESS_TO);
        assertThat(testCharge.isCompleted()).isEqualTo(DEFAULT_COMPLETED);
        assertThat(testCharge.getBlockchainTx()).isEqualTo(DEFAULT_BLOCKCHAIN_TX);
    }

    @Test
    @Transactional
    public void createChargeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chargeRepository.findAll().size();

        // Create the Charge with an existing ID
        charge.setId(1L);
        ChargeDTO chargeDTO = chargeMapper.toDto(charge);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChargeMockMvc.perform(post("/api/charges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chargeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Charge in the database
        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = chargeRepository.findAll().size();
        // set the field null
        charge.setAmount(null);

        // Create the Charge, which fails.
        ChargeDTO chargeDTO = chargeMapper.toDto(charge);

        restChargeMockMvc.perform(post("/api/charges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chargeDTO)))
            .andExpect(status().isBadRequest());

        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCharges() throws Exception {
        // Initialize the database
        chargeRepository.saveAndFlush(charge);

        // Get all the chargeList
        restChargeMockMvc.perform(get("/api/charges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(charge.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].transaction").value(hasItem(DEFAULT_TRANSACTION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].addressFrom").value(hasItem(DEFAULT_ADDRESS_FROM.toString())))
            .andExpect(jsonPath("$.[*].addressTo").value(hasItem(DEFAULT_ADDRESS_TO.toString())))
            .andExpect(jsonPath("$.[*].completed").value(hasItem(DEFAULT_COMPLETED.booleanValue())))
            .andExpect(jsonPath("$.[*].blockchainTx").value(hasItem(DEFAULT_BLOCKCHAIN_TX.toString())));
    }
    

    @Test
    @Transactional
    public void getCharge() throws Exception {
        // Initialize the database
        chargeRepository.saveAndFlush(charge);

        // Get the charge
        restChargeMockMvc.perform(get("/api/charges/{id}", charge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(charge.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.transaction").value(DEFAULT_TRANSACTION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.addressFrom").value(DEFAULT_ADDRESS_FROM.toString()))
            .andExpect(jsonPath("$.addressTo").value(DEFAULT_ADDRESS_TO.toString()))
            .andExpect(jsonPath("$.completed").value(DEFAULT_COMPLETED.booleanValue()))
            .andExpect(jsonPath("$.blockchainTx").value(DEFAULT_BLOCKCHAIN_TX.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCharge() throws Exception {
        // Get the charge
        restChargeMockMvc.perform(get("/api/charges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCharge() throws Exception {
        // Initialize the database
        chargeRepository.saveAndFlush(charge);

        int databaseSizeBeforeUpdate = chargeRepository.findAll().size();

        // Update the charge
        Charge updatedCharge = chargeRepository.findById(charge.getId()).get();
        // Disconnect from session so that the updates on updatedCharge are not directly saved in db
        em.detach(updatedCharge);
        updatedCharge
            .amount(UPDATED_AMOUNT)
            .transaction(UPDATED_TRANSACTION)
            .description(UPDATED_DESCRIPTION)
            .addressFrom(UPDATED_ADDRESS_FROM)
            .addressTo(UPDATED_ADDRESS_TO)
            .completed(UPDATED_COMPLETED)
            .blockchainTx(UPDATED_BLOCKCHAIN_TX);
        ChargeDTO chargeDTO = chargeMapper.toDto(updatedCharge);

        restChargeMockMvc.perform(put("/api/charges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chargeDTO)))
            .andExpect(status().isOk());

        // Validate the Charge in the database
        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeUpdate);
        Charge testCharge = chargeList.get(chargeList.size() - 1);
        assertThat(testCharge.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCharge.getTransaction()).isEqualTo(UPDATED_TRANSACTION);
        assertThat(testCharge.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCharge.getAddressFrom()).isEqualTo(UPDATED_ADDRESS_FROM);
        assertThat(testCharge.getAddressTo()).isEqualTo(UPDATED_ADDRESS_TO);
        assertThat(testCharge.isCompleted()).isEqualTo(UPDATED_COMPLETED);
        assertThat(testCharge.getBlockchainTx()).isEqualTo(UPDATED_BLOCKCHAIN_TX);
    }

    @Test
    @Transactional
    public void updateNonExistingCharge() throws Exception {
        int databaseSizeBeforeUpdate = chargeRepository.findAll().size();

        // Create the Charge
        ChargeDTO chargeDTO = chargeMapper.toDto(charge);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChargeMockMvc.perform(put("/api/charges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chargeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Charge in the database
        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCharge() throws Exception {
        // Initialize the database
        chargeRepository.saveAndFlush(charge);

        int databaseSizeBeforeDelete = chargeRepository.findAll().size();

        // Get the charge
        restChargeMockMvc.perform(delete("/api/charges/{id}", charge.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Charge> chargeList = chargeRepository.findAll();
        assertThat(chargeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Charge.class);
        Charge charge1 = new Charge();
        charge1.setId(1L);
        Charge charge2 = new Charge();
        charge2.setId(charge1.getId());
        assertThat(charge1).isEqualTo(charge2);
        charge2.setId(2L);
        assertThat(charge1).isNotEqualTo(charge2);
        charge1.setId(null);
        assertThat(charge1).isNotEqualTo(charge2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChargeDTO.class);
        ChargeDTO chargeDTO1 = new ChargeDTO();
        chargeDTO1.setId(1L);
        ChargeDTO chargeDTO2 = new ChargeDTO();
        assertThat(chargeDTO1).isNotEqualTo(chargeDTO2);
        chargeDTO2.setId(chargeDTO1.getId());
        assertThat(chargeDTO1).isEqualTo(chargeDTO2);
        chargeDTO2.setId(2L);
        assertThat(chargeDTO1).isNotEqualTo(chargeDTO2);
        chargeDTO1.setId(null);
        assertThat(chargeDTO1).isNotEqualTo(chargeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(chargeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(chargeMapper.fromId(null)).isNull();
    }
}
