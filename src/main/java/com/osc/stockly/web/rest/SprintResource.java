package com.osc.stockly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.osc.stockly.domain.Sprint;
import com.osc.stockly.repository.SprintRepository;
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
 * REST controller for managing Sprint.
 */
@RestController
@RequestMapping("/api")
public class SprintResource {

    private final Logger log = LoggerFactory.getLogger(SprintResource.class);
        
    @Inject
    private SprintRepository sprintRepository;
    
    /**
     * POST  /sprints -> Create a new sprint.
     */
    @RequestMapping(value = "/sprints",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) throws URISyntaxException {
        log.debug("REST request to save Sprint : {}", sprint);
        if (sprint.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("sprint", "idexists", "A new sprint cannot already have an ID")).body(null);
        }
        Sprint result = sprintRepository.save(sprint);
        return ResponseEntity.created(new URI("/api/sprints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("sprint", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sprints -> Updates an existing sprint.
     */
    @RequestMapping(value = "/sprints",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Sprint> updateSprint(@RequestBody Sprint sprint) throws URISyntaxException {
        log.debug("REST request to update Sprint : {}", sprint);
        if (sprint.getId() == null) {
            return createSprint(sprint);
        }
        Sprint result = sprintRepository.save(sprint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("sprint", sprint.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sprints -> get all the sprints.
     */
    @RequestMapping(value = "/sprints",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Sprint> getAllSprints() {
        log.debug("REST request to get all Sprints");
        return sprintRepository.findAll();
            }

    /**
     * GET  /sprints/:id -> get the "id" sprint.
     */
    @RequestMapping(value = "/sprints/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Sprint> getSprint(@PathVariable Long id) {
        log.debug("REST request to get Sprint : {}", id);
        Sprint sprint = sprintRepository.findOne(id);
        return Optional.ofNullable(sprint)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /sprints/:id -> delete the "id" sprint.
     */
    @RequestMapping(value = "/sprints/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSprint(@PathVariable Long id) {
        log.debug("REST request to delete Sprint : {}", id);
        sprintRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("sprint", id.toString())).build();
    }
}
