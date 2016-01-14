package com.osc.stockly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.osc.stockly.domain.UserStock;
import com.osc.stockly.repository.UserStockRepository;
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
 * REST controller for managing UserStock.
 */
@RestController
@RequestMapping("/api")
public class UserStockResource {

    private final Logger log = LoggerFactory.getLogger(UserStockResource.class);
        
    @Inject
    private UserStockRepository userStockRepository;
    
    /**
     * POST  /userStocks -> Create a new userStock.
     */
    @RequestMapping(value = "/userStocks",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStock> createUserStock(@RequestBody UserStock userStock) throws URISyntaxException {
        log.debug("REST request to save UserStock : {}", userStock);
        if (userStock.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userStock", "idexists", "A new userStock cannot already have an ID")).body(null);
        }
        UserStock result = userStockRepository.save(userStock);
        return ResponseEntity.created(new URI("/api/userStocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userStock", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userStocks -> Updates an existing userStock.
     */
    @RequestMapping(value = "/userStocks",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStock> updateUserStock(@RequestBody UserStock userStock) throws URISyntaxException {
        log.debug("REST request to update UserStock : {}", userStock);
        if (userStock.getId() == null) {
            return createUserStock(userStock);
        }
        UserStock result = userStockRepository.save(userStock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userStock", userStock.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userStocks -> get all the userStocks.
     */
    @RequestMapping(value = "/userStocks",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserStock> getAllUserStocks() {
        log.debug("REST request to get all UserStocks");
        return userStockRepository.findAll();
            }

    /**
     * GET  /userStocks/:id -> get the "id" userStock.
     */
    @RequestMapping(value = "/userStocks/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStock> getUserStock(@PathVariable Long id) {
        log.debug("REST request to get UserStock : {}", id);
        UserStock userStock = userStockRepository.findOne(id);
        return Optional.ofNullable(userStock)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userStocks/:id -> delete the "id" userStock.
     */
    @RequestMapping(value = "/userStocks/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserStock(@PathVariable Long id) {
        log.debug("REST request to delete UserStock : {}", id);
        userStockRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userStock", id.toString())).build();
    }
}
