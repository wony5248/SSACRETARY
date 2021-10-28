package com.ssacretary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
public class SsacretaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsacretaryApplication.class, args);

	}

}

