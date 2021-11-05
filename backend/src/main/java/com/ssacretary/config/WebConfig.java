//package com.ssacretary.config;
//
//import io.swagger.models.HttpMethod;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Autowired
//    private JwtInterceptor jwtInterceptor;
//
//    public WebConfig(JwtInterceptor jwtInterceptor) {
//        this.jwtInterceptor = jwtInterceptor;
//    }
//
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:8080")
//                .allowedOrigins("http://ssacretary.com")
//                .allowedMethods(
//                        HttpMethod.GET.name(),
//                        HttpMethod.HEAD.name(),
//                        HttpMethod.POST.name(),
//                        HttpMethod.PUT.name(),
//                        HttpMethod.DELETE.name());
//    }
//}
