package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.common.util.JwtTokenUtil;
import com.bigdata.wooahgong.user.dtos.KakaoProfile;
import com.bigdata.wooahgong.user.dtos.request.CommonLoginReq;
import com.bigdata.wooahgong.user.dtos.response.CommonLoginRes;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/login")
public class LoginController {
    private final LoginService loginService;
    private final UserRepository userRepository;

    // 일반 로그인
    @PostMapping
    public ResponseEntity<CommonLoginRes> login(@RequestBody CommonLoginReq commonLoginReq) {
        CommonLoginRes commonLoginRes = loginService.login(commonLoginReq.getUserId(), commonLoginReq.getPassword());
        return new ResponseEntity<>(commonLoginRes, HttpStatus.OK);
    }

    // 카카오 로그인
    // 인가코드를 받아온 후 부터 진행
    @GetMapping("/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam String code) {
        // 1. 인가 코드로 액세스 토큰을 받아온다.
        String accessToken = loginService.getAccessToken(code);
        // 2. 액세스 토큰으로 카카오 정보를 가져온다.
        KakaoProfile kakaoProfile = loginService.getProfileByToken(accessToken);
        // 3. 카카오 정보로 회원인지 아닌지 검사한다.
        User user = userRepository.findByEmail(kakaoProfile.getKakao_account().getEmail()).orElse(null);
        // 3-1. 회원이 아니라면 회원가입 절차 진행
        Map<String, Object> map = new HashMap<>();
        if (user == null) {
            map.put("email", kakaoProfile.getKakao_account().getEmail());
        }
        // 3-2. 회원이라면 커스텀 토큰 발급
        else {
            map.put("token", "Bearer "+JwtTokenUtil.getToken(user.getEmail()));
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
