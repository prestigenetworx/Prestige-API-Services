package com.prestige.network.web.rest;

import com.prestige.network.PrestigeApp;

import com.prestige.network.domain.Business;
import com.prestige.network.repository.BusinessRepository;
import com.prestige.network.service.BusinessService;
import com.prestige.network.service.dto.BusinessDTO;
import com.prestige.network.service.mapper.BusinessMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static com.prestige.network.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BusinessResource REST controller.
 *
 * @see BusinessResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestigeApp.class)
public class BusinessResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_STREET_1 = "AAAAAAAAAA";
    private static final String UPDATED_STREET_1 = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_2 = "AAAAAAAAAA";
    private static final String UPDATED_STREET_2 = "BBBBBBBBBB";

    private static final String DEFAULT_ZIPCODE = "AAAAAAAAAA";
    private static final String UPDATED_ZIPCODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    @Autowired
    private BusinessRepository businessRepository;


    @Autowired
    private BusinessMapper businessMapper;
    

    @Autowired
    private BusinessService businessService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessMockMvc;

    private Business business;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessResource businessResource = new BusinessResource(businessService);
        this.restBusinessMockMvc = MockMvcBuilders.standaloneSetup(businessResource)
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
    public static Business createEntity(EntityManager em) {
        Business business = new Business()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .street1(DEFAULT_STREET_1)
            .street2(DEFAULT_STREET_2)
            .zipcode(DEFAULT_ZIPCODE)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY);
        return business;
    }

    @Before
    public void initTest() {
        business = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusiness() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();

        // Create the Business
        BusinessDTO businessDTO = businessMapper.toDto(business);
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isCreated());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate + 1);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBusiness.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBusiness.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testBusiness.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testBusiness.getStreet1()).isEqualTo(DEFAULT_STREET_1);
        assertThat(testBusiness.getStreet2()).isEqualTo(DEFAULT_STREET_2);
        assertThat(testBusiness.getZipcode()).isEqualTo(DEFAULT_ZIPCODE);
        assertThat(testBusiness.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testBusiness.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testBusiness.getCountry()).isEqualTo(DEFAULT_COUNTRY);
    }

    @Test
    @Transactional
    public void createBusinessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();

        // Create the Business with an existing ID
        business.setId(1L);
        BusinessDTO businessDTO = businessMapper.toDto(business);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setName(null);

        // Create the Business, which fails.
        BusinessDTO businessDTO = businessMapper.toDto(business);

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBusinesses() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get all the businessList
        restBusinessMockMvc.perform(get("/api/businesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(business.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].street1").value(hasItem(DEFAULT_STREET_1.toString())))
            .andExpect(jsonPath("$.[*].street2").value(hasItem(DEFAULT_STREET_2.toString())))
            .andExpect(jsonPath("$.[*].zipcode").value(hasItem(DEFAULT_ZIPCODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())));
    }
    

    @Test
    @Transactional
    public void getBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", business.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(business.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.street1").value(DEFAULT_STREET_1.toString()))
            .andExpect(jsonPath("$.street2").value(DEFAULT_STREET_2.toString()))
            .andExpect(jsonPath("$.zipcode").value(DEFAULT_ZIPCODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBusiness() throws Exception {
        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Update the business
        Business updatedBusiness = businessRepository.findById(business.getId()).get();
        // Disconnect from session so that the updates on updatedBusiness are not directly saved in db
        em.detach(updatedBusiness);
        updatedBusiness
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .street1(UPDATED_STREET_1)
            .street2(UPDATED_STREET_2)
            .zipcode(UPDATED_ZIPCODE)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY);
        BusinessDTO businessDTO = businessMapper.toDto(updatedBusiness);

        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isOk());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBusiness.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBusiness.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testBusiness.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testBusiness.getStreet1()).isEqualTo(UPDATED_STREET_1);
        assertThat(testBusiness.getStreet2()).isEqualTo(UPDATED_STREET_2);
        assertThat(testBusiness.getZipcode()).isEqualTo(UPDATED_ZIPCODE);
        assertThat(testBusiness.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testBusiness.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testBusiness.getCountry()).isEqualTo(UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingBusiness() throws Exception {
        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Create the Business
        BusinessDTO businessDTO = businessMapper.toDto(business);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeDelete = businessRepository.findAll().size();

        // Get the business
        restBusinessMockMvc.perform(delete("/api/businesses/{id}", business.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Business.class);
        Business business1 = new Business();
        business1.setId(1L);
        Business business2 = new Business();
        business2.setId(business1.getId());
        assertThat(business1).isEqualTo(business2);
        business2.setId(2L);
        assertThat(business1).isNotEqualTo(business2);
        business1.setId(null);
        assertThat(business1).isNotEqualTo(business2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessDTO.class);
        BusinessDTO businessDTO1 = new BusinessDTO();
        businessDTO1.setId(1L);
        BusinessDTO businessDTO2 = new BusinessDTO();
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
        businessDTO2.setId(businessDTO1.getId());
        assertThat(businessDTO1).isEqualTo(businessDTO2);
        businessDTO2.setId(2L);
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
        businessDTO1.setId(null);
        assertThat(businessDTO1).isNotEqualTo(businessDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(businessMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(businessMapper.fromId(null)).isNull();
    }
}
