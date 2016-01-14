package com.osc.stockly.web.rest;

import com.osc.stockly.Application;
import com.osc.stockly.domain.UserStock;
import com.osc.stockly.repository.UserStockRepository;

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
 * Test class for the UserStockResource REST controller.
 *
 * @see UserStockResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserStockResourceIntTest {


    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final Float DEFAULT_BUY_PRICE = 1F;
    private static final Float UPDATED_BUY_PRICE = 2F;

    @Inject
    private UserStockRepository userStockRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserStockMockMvc;

    private UserStock userStock;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserStockResource userStockResource = new UserStockResource();
        ReflectionTestUtils.setField(userStockResource, "userStockRepository", userStockRepository);
        this.restUserStockMockMvc = MockMvcBuilders.standaloneSetup(userStockResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userStock = new UserStock();
        userStock.setAmount(DEFAULT_AMOUNT);
        userStock.setBuyPrice(DEFAULT_BUY_PRICE);
    }

    @Test
    @Transactional
    public void createUserStock() throws Exception {
        int databaseSizeBeforeCreate = userStockRepository.findAll().size();

        // Create the UserStock

        restUserStockMockMvc.perform(post("/api/userStocks")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStock)))
                .andExpect(status().isCreated());

        // Validate the UserStock in the database
        List<UserStock> userStocks = userStockRepository.findAll();
        assertThat(userStocks).hasSize(databaseSizeBeforeCreate + 1);
        UserStock testUserStock = userStocks.get(userStocks.size() - 1);
        assertThat(testUserStock.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testUserStock.getBuyPrice()).isEqualTo(DEFAULT_BUY_PRICE);
    }

    @Test
    @Transactional
    public void getAllUserStocks() throws Exception {
        // Initialize the database
        userStockRepository.saveAndFlush(userStock);

        // Get all the userStocks
        restUserStockMockMvc.perform(get("/api/userStocks?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userStock.getId().intValue())))
                .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
                .andExpect(jsonPath("$.[*].buyPrice").value(hasItem(DEFAULT_BUY_PRICE.doubleValue())));
    }

    @Test
    @Transactional
    public void getUserStock() throws Exception {
        // Initialize the database
        userStockRepository.saveAndFlush(userStock);

        // Get the userStock
        restUserStockMockMvc.perform(get("/api/userStocks/{id}", userStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userStock.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.buyPrice").value(DEFAULT_BUY_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserStock() throws Exception {
        // Get the userStock
        restUserStockMockMvc.perform(get("/api/userStocks/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserStock() throws Exception {
        // Initialize the database
        userStockRepository.saveAndFlush(userStock);

		int databaseSizeBeforeUpdate = userStockRepository.findAll().size();

        // Update the userStock
        userStock.setAmount(UPDATED_AMOUNT);
        userStock.setBuyPrice(UPDATED_BUY_PRICE);

        restUserStockMockMvc.perform(put("/api/userStocks")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStock)))
                .andExpect(status().isOk());

        // Validate the UserStock in the database
        List<UserStock> userStocks = userStockRepository.findAll();
        assertThat(userStocks).hasSize(databaseSizeBeforeUpdate);
        UserStock testUserStock = userStocks.get(userStocks.size() - 1);
        assertThat(testUserStock.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testUserStock.getBuyPrice()).isEqualTo(UPDATED_BUY_PRICE);
    }

    @Test
    @Transactional
    public void deleteUserStock() throws Exception {
        // Initialize the database
        userStockRepository.saveAndFlush(userStock);

		int databaseSizeBeforeDelete = userStockRepository.findAll().size();

        // Get the userStock
        restUserStockMockMvc.perform(delete("/api/userStocks/{id}", userStock.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserStock> userStocks = userStockRepository.findAll();
        assertThat(userStocks).hasSize(databaseSizeBeforeDelete - 1);
    }
}
