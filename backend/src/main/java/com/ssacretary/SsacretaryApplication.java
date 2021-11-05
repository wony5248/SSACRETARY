package com.ssacretary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableScheduling
@SpringBootApplication
public class SsacretaryApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(SsacretaryApplication.class, args);

	}

}

