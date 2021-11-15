package com.ssacretary.db.entity;

import lombok.*;
import org.checkerframework.checker.units.qual.C;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private int logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "setting_id")
    private Setting setting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private User user;

    @OneToMany(mappedBy = "log", cascade = CascadeType.ALL)
    private List<Count> countList = new ArrayList<>();

    @OneToMany(mappedBy = "log", cascade = CascadeType.ALL)
    private List<Sentence> sentenceList = new ArrayList<>();

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "htmlSuccess")
    private boolean htmlSuccess;

    @Column(name = "htmlSource",columnDefinition = "TEXT")
    private String htmlSource;

}
