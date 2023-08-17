package com.bigdata.wooahgong.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtTokenUtil {
    private static String secretKey;
    private static Integer expirationTime;

    private static JWTVerifier jwtVerifier;

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String ISSUER = "wooahgong";
    public static final String HEADER_STRING = "Authorization";

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") Integer expirationTime) {
        JwtTokenUtil.secretKey = secretKey;
        JwtTokenUtil.expirationTime = expirationTime;
    }

    @PostConstruct
    public void init() {
        jwtVerifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String getToken(String email) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static Date getTokenExpiration(int expirationTime) {
        LocalDateTime expiryDateTime = LocalDateTime.now().plusSeconds(expirationTime);
        return Date.from(expiryDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static String verifyToken(String token) {
        try {
            DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(TOKEN_PREFIX, ""));
            return decodedJWT.getSubject();
        } catch (JWTDecodeException ex) {
            throw new CustomException(ErrorCode.NOT_OUR_USER);
        }
    }
}