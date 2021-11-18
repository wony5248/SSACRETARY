package com.ssacretary.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private int keywordId;

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL)
    private List<SettingKeyword> settingKeywordList = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL)
    private List<Count> countList = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL)
    private List<Sentence> sentenceList = new ArrayList<>();

    @Column(name = "keyword")
    private String keyword;

}
