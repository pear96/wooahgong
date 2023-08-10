package com.bigdata.wooahgong.user.dtos.request;

import com.bigdata.wooahgong.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class SignUpReq {
    private String userId;
    private String password;
    private String nickname;
    private String email;
    private boolean gender;
    private LocalDate birth;
    private boolean provider;
    private List<String> moods;
    private String mbti;

    @Value("${image.dir}")
    private String IMG_DIR;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .password(password)
                .nickname(nickname)
                .email(email)
                .birth(birth)
                .gender(gender)
                .provider(provider)
                .imageUrl(IMG_DIR + "logo.png")
                .mbti(mbti).build();
    }
}
