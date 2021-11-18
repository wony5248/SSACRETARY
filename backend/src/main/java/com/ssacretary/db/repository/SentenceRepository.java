package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Sentence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SentenceRepository extends JpaRepository<Sentence,Integer> {
    List<Sentence> findByLog_LogIdAndKeyword_KeywordId(int logId, int keywordId);

}
