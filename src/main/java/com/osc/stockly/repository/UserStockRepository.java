package com.osc.stockly.repository;

import com.osc.stockly.domain.UserStock;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserStock entity.
 */
public interface UserStockRepository extends JpaRepository<UserStock,Long> {

    @Query("select userStock from UserStock userStock where userStock.user.login = ?#{principal.username}")
    List<UserStock> findByUserIsCurrentUser();

}
