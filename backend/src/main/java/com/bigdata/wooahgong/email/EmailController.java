package com.bigdata.wooahgong.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity checkEmail(@RequestBody HashMap<String, String> inputEmail) throws Exception {
        /* 이메일 중복확인
         * 권한 : 모두사용
         */
        return emailService.checkEmail(inputEmail.get("email"));
    }


}
