package com.osc.stockly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.osc.stockly.domain.UserSprint;
import com.osc.stockly.repository.UserSprintRepository;
import com.osc.stockly.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserSprint.
 */
@RestController
@RequestMapping("/api")
public class UserSprintResource {

    private final Logger log = LoggerFactory.getLogger(UserSprintResource.class);
        
    @Inject
    private UserSprintRepository userSprintRepository;
    
    /**
     * POST  /userSprints -> Create a new userSprint.
     */
    @RequestMapping(value = "/userSprints",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserSprint> createUserSprint(@RequestBody UserSprint userSprint) throws URISyntaxException {
        log.debug("REST request to save UserSprint : {}", userSprint);
        if (userSprint.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userSprint", "idexists", "A new userSprint cannot already have an ID")).body(null);
        }
        UserSprint result = userSprintRepository.save(userSprint);
        return ResponseEntity.created(new URI("/api/userSprints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userSprint", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userSprints -> Updates an existing userSprint.
     */
    @RequestMapping(value = "/userSprints",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserSprint> updateUserSprint(@RequestBody UserSprint userSprint) throws URISyntaxException {
        log.debug("REST request to update UserSprint : {}", userSprint);
        if (userSprint.getId() == null) {
            return createUserSprint(userSprint);
        }
        UserSprint result = userSprintRepository.save(userSprint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userSprint", userSprint.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userSprints -> get all the userSprints.
     */
    @RequestMapping(value = "/userSprints",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserSprint> getAllUserSprints() {
        log.debug("REST request to get all UserSprints");
        return userSprintRepository.findAll();
            }

    /**
     * GET  /userSprints/:id -> get the "id" userSprint.
     */
    @RequestMapping(value = "/userSprints/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserSprint> getUserSprint(@PathVariable Long id) {
        log.debug("REST request to get UserSprint : {}", id);
        UserSprint userSprint = userSprintRepository.findOne(id);
        return Optional.ofNullable(userSprint)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userSprints/:id -> delete the "id" userSprint.
     */
    @RequestMapping(value = "/userSprints/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserSprint(@PathVariable Long id) {
        log.debug("REST request to delete UserSprint : {}", id);
        userSprintRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userSprint", id.toString())).build();
    }
}
