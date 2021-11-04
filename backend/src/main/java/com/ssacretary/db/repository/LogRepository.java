package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log,Integer> {
}
