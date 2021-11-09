package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword,Integer> {
    Keyword findByKeywordId(Long keywordId);

    Keyword findByKeyword(String keyword);

}
