package com.bigdata.wooahgong.user;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.util.JwtTokenUtil;
import com.bigdata.wooahgong.email.EmailService;
import com.bigdata.wooahgong.mood.entity.Mood;
import com.bigdata.wooahgong.mood.repository.MoodRepository;
import com.bigdata.wooahgong.user.dtos.request.FindPwSendEmailReq;
import com.bigdata.wooahgong.user.dtos.request.ResetPwdReq;
import com.bigdata.wooahgong.user.dtos.request.SignUpReq;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.entity.UserMood;
import com.bigdata.wooahgong.user.repository.UserMoodRepository;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final MoodRepository moodRepository;
    private final UserRepository userRepository;
    private final UserMoodRepository userMoodRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public String getEmailByToken(String token){
        JWTVerifier verifier = JwtTokenUtil.getVerifier();
        JwtTokenUtil.handleError(token);
        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        return decodedJWT.getSubject();
    }
    @Transactional
    public void signUp(SignUpReq commonSignUpReq) {
        commonSignUpReq.setPassword(passwordEncoder.encode(commonSignUpReq.getPassword()));
        User user = userRepository.findByEmail(commonSignUpReq.getEmail()).orElse(null);
        // 에러 핸들링
        if(user != null){
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        if("".equals(commonSignUpReq.getEmail()) || commonSignUpReq.getEmail() == null){
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        // 유저 엔티티화 후 DB에 저장
        user = commonSignUpReq.toEntity();

        userRepository.save(user);
        // 선호 분위기 추가
        for (String s : commonSignUpReq.getMoods()) {
            Mood mood = moodRepository.findByMoodContaining(s).orElseThrow(() ->
                    new EntityNotFoundException("해당 분위기는 DB에 존재하지 않음")
            );
            // user-mood 테이블에 데이터 추가
            userMoodRepository.save(UserMood.builder().mood(mood).user(user).build());
        }

    }

    // 아이디 중복 체크
    public void dupCheckUserId(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
    }

    // 닉네임 중복 체크
    public void dupCheckNickname(String nickname) {
        User user = userRepository.findByNickname(nickname).orElse(null);
        if (user != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
    }

    // 아이디 찾기
    public String findId(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return user.getUserId();
    }

    // 비밀번호 찾기1 - 이메일 전송
    public void findPwSendEmail(FindPwSendEmailReq findPwSendEmailReq) {
        String userId = findPwSendEmailReq.getUserId();
        String email = findPwSendEmailReq.getEmail();

        // 에러 핸들링
        userRepository.findByEmail(email).orElseThrow(()->
                new CustomException(ErrorCode.EMAIL_NOT_FOUND));
        userRepository.findByUserId(userId).orElseThrow(()->
                new CustomException(ErrorCode.USER_NOT_FOUND));
        // 이메일 전송
        try {
            emailService.checkEmail(email);
        } catch (Exception e) {
            // 익셉션을 던지기 때문에 여기서 처리.
            e.printStackTrace();
            new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
    }
    // 비밀번호 찾기2 인증코드 확인
    public ResponseEntity findPwInsertCode(String userId, String authCode) {
        String email = userRepository.findEmailByUserId(userId).orElseThrow(()->
                new CustomException(ErrorCode.EMAIL_NOT_FOUND));
        return emailService.checkEmailAuthCode(email,authCode);
    }

    public void resetPwd(ResetPwdReq resetPwdReq) {
        String userId = resetPwdReq.getUserId();
        String password = resetPwdReq.getPassword();
        User user = userRepository.findByUserId(userId).orElseThrow(()->
                new CustomException(ErrorCode.NOT_OUR_USER));
        user.resetPwd(password);
        userRepository.save(user);
    }
}
