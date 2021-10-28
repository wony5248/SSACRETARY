package com.ssacretary.db.repository;

import com.ssacretary.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

public interface UserRepository extends JpaRepository<User,String> {
    User findByEmail(String email);

}
=======
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByPhone(String phone);

}
>>>>>>> 6a78b45cef9625d26272c2ca327df7147cb84251
