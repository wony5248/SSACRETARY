package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Sentence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceRepository extends JpaRepository<Sentence,Integer> {
}
