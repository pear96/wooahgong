package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.user.dtos.request.CommonLoginReq;
import com.bigdata.wooahgong.user.dtos.response.CommonLoginRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/login")
public class LoginController {
    private final UserService userService;
    private final LoginService loginService;


    // 일반 로그인
    @PostMapping
    public ResponseEntity<CommonLoginRes> login(@RequestBody CommonLoginReq commonLoginReq) {
        CommonLoginRes commonLoginRes = loginService.login(commonLoginReq.getUserId(),commonLoginReq.getPassword());
        return new ResponseEntity<CommonLoginRes>(commonLoginRes,HttpStatus.OK);
    }

    // 카카오 로그인
    // 인가코드를 받아온 후 부터 진행
    @GetMapping("/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(String code) {
        String accessToken = loginService.getAccessToken(code);
        System.out.println("액세스 토큰 ======");
        System.out.println(accessToken);

        return null;
    }

}
