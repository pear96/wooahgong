package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.mood.entity.Mood;
import com.bigdata.wooahgong.mood.repository.MoodRepository;
import com.bigdata.wooahgong.user.dtos.request.SignUpReq;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.entity.UserMood;
import com.bigdata.wooahgong.user.repository.UserMoodRepository;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public void signUp(SignUpReq commonSignUpReq) {
        commonSignUpReq.setPassword(passwordEncoder.encode(commonSignUpReq.getPassword()));
        // 유저 엔티티화 후 DB에 저장
        User user = commonSignUpReq.toEntity();
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
}
