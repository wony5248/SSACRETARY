package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Count;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountRepository extends JpaRepository<Count,Integer> {
    List<Count> findByLog_LogId(int logId);

    List<Count> findByKeyword_KeywordId(int keywordId);


}
