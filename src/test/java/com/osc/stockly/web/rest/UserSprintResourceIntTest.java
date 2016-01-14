package com.osc.stockly.web.rest;

import com.osc.stockly.Application;
import com.osc.stockly.domain.UserSprint;
import com.osc.stockly.repository.UserSprintRepository;

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
 * Test class for the UserSprintResource REST controller.
 *
 * @see UserSprintResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserSprintResourceIntTest {


    private static final Float DEFAULT_CASH = 1F;
    private static final Float UPDATED_CASH = 2F;

    @Inject
    private UserSprintRepository userSprintRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserSprintMockMvc;

    private UserSprint userSprint;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserSprintResource userSprintResource = new UserSprintResource();
        ReflectionTestUtils.setField(userSprintResource, "userSprintRepository", userSprintRepository);
        this.restUserSprintMockMvc = MockMvcBuilders.standaloneSetup(userSprintResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userSprint = new UserSprint();
        userSprint.setCash(DEFAULT_CASH);
    }

    @Test
    @Transactional
    public void createUserSprint() throws Exception {
        int databaseSizeBeforeCreate = userSprintRepository.findAll().size();

        // Create the UserSprint

        restUserSprintMockMvc.perform(post("/api/userSprints")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userSprint)))
                .andExpect(status().isCreated());

        // Validate the UserSprint in the database
        List<UserSprint> userSprints = userSprintRepository.findAll();
        assertThat(userSprints).hasSize(databaseSizeBeforeCreate + 1);
        UserSprint testUserSprint = userSprints.get(userSprints.size() - 1);
        assertThat(testUserSprint.getCash()).isEqualTo(DEFAULT_CASH);
    }

    @Test
    @Transactional
    public void getAllUserSprints() throws Exception {
        // Initialize the database
        userSprintRepository.saveAndFlush(userSprint);

        // Get all the userSprints
        restUserSprintMockMvc.perform(get("/api/userSprints?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userSprint.getId().intValue())))
                .andExpect(jsonPath("$.[*].cash").value(hasItem(DEFAULT_CASH.doubleValue())));
    }

    @Test
    @Transactional
    public void getUserSprint() throws Exception {
        // Initialize the database
        userSprintRepository.saveAndFlush(userSprint);

        // Get the userSprint
        restUserSprintMockMvc.perform(get("/api/userSprints/{id}", userSprint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userSprint.getId().intValue()))
            .andExpect(jsonPath("$.cash").value(DEFAULT_CASH.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSprint() throws Exception {
        // Get the userSprint
        restUserSprintMockMvc.perform(get("/api/userSprints/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSprint() throws Exception {
        // Initialize the database
        userSprintRepository.saveAndFlush(userSprint);

		int databaseSizeBeforeUpdate = userSprintRepository.findAll().size();

        // Update the userSprint
        userSprint.setCash(UPDATED_CASH);

        restUserSprintMockMvc.perform(put("/api/userSprints")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userSprint)))
                .andExpect(status().isOk());

        // Validate the UserSprint in the database
        List<UserSprint> userSprints = userSprintRepository.findAll();
        assertThat(userSprints).hasSize(databaseSizeBeforeUpdate);
        UserSprint testUserSprint = userSprints.get(userSprints.size() - 1);
        assertThat(testUserSprint.getCash()).isEqualTo(UPDATED_CASH);
    }

    @Test
    @Transactional
    public void deleteUserSprint() throws Exception {
        // Initialize the database
        userSprintRepository.saveAndFlush(userSprint);

		int databaseSizeBeforeDelete = userSprintRepository.findAll().size();

        // Get the userSprint
        restUserSprintMockMvc.perform(delete("/api/userSprints/{id}", userSprint.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserSprint> userSprints = userSprintRepository.findAll();
        assertThat(userSprints).hasSize(databaseSizeBeforeDelete - 1);
    }
}
