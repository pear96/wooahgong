package com.bigdata.wooahgong.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/signup")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<String> checkEmail(@RequestBody HashMap<String, String> inputEmail) throws Exception {
        /*
         * 이메일 중복확인
         * 권한 : 모두사용
         */
        return emailService.checkEmailForSignup(inputEmail.get("email"));
    }

    @GetMapping(value="", params = {"email", "authCode"})
    public ResponseEntity<String> checkEmailIsAuth(@RequestParam String email, String authCode) {
        /*
         * 이메일 코드 일치 확인
         * 권한 : 모두사용
         */
        return emailService.checkEmailAuthCodeForSignup(email, authCode);
    }



}
