//package com.ssacretary.config;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//@Component
//@Slf4j
//@RequiredArgsConstructor
//public class JwtInterceptor implements HandlerInterceptor {
//    private static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//            throws Exception {
//
//        if(request.getMethod().equals("OPTIONS")) {
//            return true;
//        }else {
//            // request Parameter에서  Authorization으로 넘어온 녀석을 찾아봄.
//            String token = request.getHeader("Authorization");
//            if (token != null && token.length() > 0) {
//                logger.debug("token 검증 interceptor 진입!");
//                if(!jwtTokenProvider.validateToken(token)){
//                    throw new Exception("유효하지 않은 인증 토큰입니다.");
//                }
//                return true;
//            } else {
//                throw new RuntimeException("인증 토큰이 없습니다");
//            }
//        }
//    }
//}