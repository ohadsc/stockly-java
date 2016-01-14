package com.osc.stockly.repository;

import com.osc.stockly.domain.UserSprint;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserSprint entity.
 */
public interface UserSprintRepository extends JpaRepository<UserSprint,Long> {

    @Query("select userSprint from UserSprint userSprint where userSprint.user.login = ?#{principal.username}")
    List<UserSprint> findByUserIsCurrentUser();

}
