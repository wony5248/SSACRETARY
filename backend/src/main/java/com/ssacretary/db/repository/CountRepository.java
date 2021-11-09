package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Count;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountRepository extends JpaRepository<Count,Integer> {

}
