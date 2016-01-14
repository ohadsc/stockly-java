package com.osc.stockly.web.rest;

import com.osc.stockly.Application;
import com.osc.stockly.domain.Company;
import com.osc.stockly.repository.CompanyRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the CompanyResource REST controller.
 *
 * @see CompanyResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class CompanyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_SYMBOL = "AAAAA";
    private static final String UPDATED_SYMBOL = "BBBBB";
    private static final String DEFAULT_INDUSTRY = "AAAAA";
    private static final String UPDATED_INDUSTRY = "BBBBB";
    private static final String DEFAULT_SECTOR = "AAAAA";
    private static final String UPDATED_SECTOR = "BBBBB";

    @Inject
    private CompanyRepository companyRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCompanyMockMvc;

    private Company company;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CompanyResource companyResource = new CompanyResource();
        ReflectionTestUtils.setField(companyResource, "companyRepository", companyRepository);
        this.restCompanyMockMvc = MockMvcBuilders.standaloneSetup(companyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        company = new Company();
        company.setName(DEFAULT_NAME);
        company.setSymbol(DEFAULT_SYMBOL);
        company.setIndustry(DEFAULT_INDUSTRY);
        company.setSector(DEFAULT_SECTOR);
    }

    @Test
    @Transactional
    public void createCompany() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company

        restCompanyMockMvc.perform(post("/api/companys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(company)))
                .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companys = companyRepository.findAll();
        assertThat(companys).hasSize(databaseSizeBeforeCreate + 1);
        Company testCompany = companys.get(companys.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCompany.getSymbol()).isEqualTo(DEFAULT_SYMBOL);
        assertThat(testCompany.getIndustry()).isEqualTo(DEFAULT_INDUSTRY);
        assertThat(testCompany.getSector()).isEqualTo(DEFAULT_SECTOR);
    }

    @Test
    @Transactional
    public void getAllCompanys() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companys
        restCompanyMockMvc.perform(get("/api/companys?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(company.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].symbol").value(hasItem(DEFAULT_SYMBOL.toString())))
                .andExpect(jsonPath("$.[*].industry").value(hasItem(DEFAULT_INDUSTRY.toString())))
                .andExpect(jsonPath("$.[*].sector").value(hasItem(DEFAULT_SECTOR.toString())));
    }

    @Test
    @Transactional
    public void getCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get the company
        restCompanyMockMvc.perform(get("/api/companys/{id}", company.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(company.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.symbol").value(DEFAULT_SYMBOL.toString()))
            .andExpect(jsonPath("$.industry").value(DEFAULT_INDUSTRY.toString()))
            .andExpect(jsonPath("$.sector").value(DEFAULT_SECTOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompany() throws Exception {
        // Get the company
        restCompanyMockMvc.perform(get("/api/companys/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

		int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Update the company
        company.setName(UPDATED_NAME);
        company.setSymbol(UPDATED_SYMBOL);
        company.setIndustry(UPDATED_INDUSTRY);
        company.setSector(UPDATED_SECTOR);

        restCompanyMockMvc.perform(put("/api/companys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(company)))
                .andExpect(status().isOk());

        // Validate the Company in the database
        List<Company> companys = companyRepository.findAll();
        assertThat(companys).hasSize(databaseSizeBeforeUpdate);
        Company testCompany = companys.get(companys.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCompany.getSymbol()).isEqualTo(UPDATED_SYMBOL);
        assertThat(testCompany.getIndustry()).isEqualTo(UPDATED_INDUSTRY);
        assertThat(testCompany.getSector()).isEqualTo(UPDATED_SECTOR);
    }

    @Test
    @Transactional
    public void deleteCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

		int databaseSizeBeforeDelete = companyRepository.findAll().size();

        // Get the company
        restCompanyMockMvc.perform(delete("/api/companys/{id}", company.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Company> companys = companyRepository.findAll();
        assertThat(companys).hasSize(databaseSizeBeforeDelete - 1);
    }
}
