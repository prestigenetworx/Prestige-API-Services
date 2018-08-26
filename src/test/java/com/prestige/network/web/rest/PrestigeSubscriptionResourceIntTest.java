package com.prestige.network.web.rest;

import com.prestige.network.PrestigeApp;

import com.prestige.network.domain.PrestigeSubscription;
import com.prestige.network.repository.PrestigeSubscriptionRepository;
import com.prestige.network.service.PrestigeSubscriptionService;
import com.prestige.network.service.dto.PrestigeSubscriptionDTO;
import com.prestige.network.service.mapper.PrestigeSubscriptionMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.prestige.network.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.prestige.network.domain.enumeration.SubscriptionType;
/**
 * Test class for the PrestigeSubscriptionResource REST controller.
 *
 * @see PrestigeSubscriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestigeApp.class)
public class PrestigeSubscriptionResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final SubscriptionType DEFAULT_TYPE = SubscriptionType.MONTHLY;
    private static final SubscriptionType UPDATED_TYPE = SubscriptionType.WEEKLY;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_RENEWAL_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RENEWAL_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PrestigeSubscriptionRepository prestigeSubscriptionRepository;


    @Autowired
    private PrestigeSubscriptionMapper prestigeSubscriptionMapper;
    

    @Autowired
    private PrestigeSubscriptionService prestigeSubscriptionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrestigeSubscriptionMockMvc;

    private PrestigeSubscription prestigeSubscription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrestigeSubscriptionResource prestigeSubscriptionResource = new PrestigeSubscriptionResource(prestigeSubscriptionService);
        this.restPrestigeSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(prestigeSubscriptionResource)
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
    public static PrestigeSubscription createEntity(EntityManager em) {
        PrestigeSubscription prestigeSubscription = new PrestigeSubscription()
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .renewalDate(DEFAULT_RENEWAL_DATE);
        return prestigeSubscription;
    }

    @Before
    public void initTest() {
        prestigeSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrestigeSubscription() throws Exception {
        int databaseSizeBeforeCreate = prestigeSubscriptionRepository.findAll().size();

        // Create the PrestigeSubscription
        PrestigeSubscriptionDTO prestigeSubscriptionDTO = prestigeSubscriptionMapper.toDto(prestigeSubscription);
        restPrestigeSubscriptionMockMvc.perform(post("/api/prestige-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestigeSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the PrestigeSubscription in the database
        List<PrestigeSubscription> prestigeSubscriptionList = prestigeSubscriptionRepository.findAll();
        assertThat(prestigeSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        PrestigeSubscription testPrestigeSubscription = prestigeSubscriptionList.get(prestigeSubscriptionList.size() - 1);
        assertThat(testPrestigeSubscription.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPrestigeSubscription.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPrestigeSubscription.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testPrestigeSubscription.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testPrestigeSubscription.getRenewalDate()).isEqualTo(DEFAULT_RENEWAL_DATE);
    }

    @Test
    @Transactional
    public void createPrestigeSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prestigeSubscriptionRepository.findAll().size();

        // Create the PrestigeSubscription with an existing ID
        prestigeSubscription.setId(1L);
        PrestigeSubscriptionDTO prestigeSubscriptionDTO = prestigeSubscriptionMapper.toDto(prestigeSubscription);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrestigeSubscriptionMockMvc.perform(post("/api/prestige-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestigeSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PrestigeSubscription in the database
        List<PrestigeSubscription> prestigeSubscriptionList = prestigeSubscriptionRepository.findAll();
        assertThat(prestigeSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrestigeSubscriptions() throws Exception {
        // Initialize the database
        prestigeSubscriptionRepository.saveAndFlush(prestigeSubscription);

        // Get all the prestigeSubscriptionList
        restPrestigeSubscriptionMockMvc.perform(get("/api/prestige-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prestigeSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].renewalDate").value(hasItem(DEFAULT_RENEWAL_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getPrestigeSubscription() throws Exception {
        // Initialize the database
        prestigeSubscriptionRepository.saveAndFlush(prestigeSubscription);

        // Get the prestigeSubscription
        restPrestigeSubscriptionMockMvc.perform(get("/api/prestige-subscriptions/{id}", prestigeSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prestigeSubscription.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.renewalDate").value(DEFAULT_RENEWAL_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPrestigeSubscription() throws Exception {
        // Get the prestigeSubscription
        restPrestigeSubscriptionMockMvc.perform(get("/api/prestige-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrestigeSubscription() throws Exception {
        // Initialize the database
        prestigeSubscriptionRepository.saveAndFlush(prestigeSubscription);

        int databaseSizeBeforeUpdate = prestigeSubscriptionRepository.findAll().size();

        // Update the prestigeSubscription
        PrestigeSubscription updatedPrestigeSubscription = prestigeSubscriptionRepository.findById(prestigeSubscription.getId()).get();
        // Disconnect from session so that the updates on updatedPrestigeSubscription are not directly saved in db
        em.detach(updatedPrestigeSubscription);
        updatedPrestigeSubscription
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .renewalDate(UPDATED_RENEWAL_DATE);
        PrestigeSubscriptionDTO prestigeSubscriptionDTO = prestigeSubscriptionMapper.toDto(updatedPrestigeSubscription);

        restPrestigeSubscriptionMockMvc.perform(put("/api/prestige-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestigeSubscriptionDTO)))
            .andExpect(status().isOk());

        // Validate the PrestigeSubscription in the database
        List<PrestigeSubscription> prestigeSubscriptionList = prestigeSubscriptionRepository.findAll();
        assertThat(prestigeSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        PrestigeSubscription testPrestigeSubscription = prestigeSubscriptionList.get(prestigeSubscriptionList.size() - 1);
        assertThat(testPrestigeSubscription.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPrestigeSubscription.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPrestigeSubscription.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testPrestigeSubscription.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testPrestigeSubscription.getRenewalDate()).isEqualTo(UPDATED_RENEWAL_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPrestigeSubscription() throws Exception {
        int databaseSizeBeforeUpdate = prestigeSubscriptionRepository.findAll().size();

        // Create the PrestigeSubscription
        PrestigeSubscriptionDTO prestigeSubscriptionDTO = prestigeSubscriptionMapper.toDto(prestigeSubscription);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrestigeSubscriptionMockMvc.perform(put("/api/prestige-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prestigeSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PrestigeSubscription in the database
        List<PrestigeSubscription> prestigeSubscriptionList = prestigeSubscriptionRepository.findAll();
        assertThat(prestigeSubscriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrestigeSubscription() throws Exception {
        // Initialize the database
        prestigeSubscriptionRepository.saveAndFlush(prestigeSubscription);

        int databaseSizeBeforeDelete = prestigeSubscriptionRepository.findAll().size();

        // Get the prestigeSubscription
        restPrestigeSubscriptionMockMvc.perform(delete("/api/prestige-subscriptions/{id}", prestigeSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrestigeSubscription> prestigeSubscriptionList = prestigeSubscriptionRepository.findAll();
        assertThat(prestigeSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrestigeSubscription.class);
        PrestigeSubscription prestigeSubscription1 = new PrestigeSubscription();
        prestigeSubscription1.setId(1L);
        PrestigeSubscription prestigeSubscription2 = new PrestigeSubscription();
        prestigeSubscription2.setId(prestigeSubscription1.getId());
        assertThat(prestigeSubscription1).isEqualTo(prestigeSubscription2);
        prestigeSubscription2.setId(2L);
        assertThat(prestigeSubscription1).isNotEqualTo(prestigeSubscription2);
        prestigeSubscription1.setId(null);
        assertThat(prestigeSubscription1).isNotEqualTo(prestigeSubscription2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrestigeSubscriptionDTO.class);
        PrestigeSubscriptionDTO prestigeSubscriptionDTO1 = new PrestigeSubscriptionDTO();
        prestigeSubscriptionDTO1.setId(1L);
        PrestigeSubscriptionDTO prestigeSubscriptionDTO2 = new PrestigeSubscriptionDTO();
        assertThat(prestigeSubscriptionDTO1).isNotEqualTo(prestigeSubscriptionDTO2);
        prestigeSubscriptionDTO2.setId(prestigeSubscriptionDTO1.getId());
        assertThat(prestigeSubscriptionDTO1).isEqualTo(prestigeSubscriptionDTO2);
        prestigeSubscriptionDTO2.setId(2L);
        assertThat(prestigeSubscriptionDTO1).isNotEqualTo(prestigeSubscriptionDTO2);
        prestigeSubscriptionDTO1.setId(null);
        assertThat(prestigeSubscriptionDTO1).isNotEqualTo(prestigeSubscriptionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(prestigeSubscriptionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(prestigeSubscriptionMapper.fromId(null)).isNull();
    }
}
