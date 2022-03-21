package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.user.dtos.response.CommonLoginRes;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    @Transactional(readOnly = true)
    public CommonLoginRes findUser(String userId, String keyword) {
        User user = userRepository.findByUserIdAndPassword(userId,keyword).orElseThrow(() ->
                new IllegalArgumentException("user IllegalArgumentException"));
        CommonLoginRes commonLoginDto = CommonLoginRes.builder()
                .nickname("누누")
                .accessToken("token")
                .profileImg("사진")
                .build();
        return commonLoginDto;
    }
}
