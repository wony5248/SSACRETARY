package com.ssacretary.db.repository;

import com.ssacretary.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<User,String> {
//    User findByUserEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByPhone(String phone);

    long deleteByEmail(String email);

}
