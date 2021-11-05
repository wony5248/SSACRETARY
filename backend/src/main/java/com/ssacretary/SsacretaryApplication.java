package com.ssacretary;

import io.swagger.models.HttpMethod;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableScheduling
@SpringBootApplication
public class SsacretaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsacretaryApplication.class, args);

	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedOrigins("http://front-server.com");
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:8080","http://localhost:3000","http://ssacretary.com","http://127.0.0.1:8080","http://127.0.0.1:3000")
						.allowCredentials(true)
						.exposedHeaders("authorization")
						.allowedMethods(
								HttpMethod.GET.name(),
								HttpMethod.HEAD.name(),
								HttpMethod.POST.name(),
								HttpMethod.PUT.name(),
								HttpMethod.DELETE.name(),
								HttpMethod.OPTIONS.name());
			}
		};
	}

}

