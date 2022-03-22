package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.user.dtos.request.SignUpReq;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpReq signUpReq) {
        userService.signUp(signUpReq);
        return new ResponseEntity<>("회원 가입 완료.", HttpStatus.OK);
    }

    @GetMapping(value = "/signup", params = "userId")
    public ResponseEntity<String> dupCheckUserId(@RequestParam("userId") String userId) {
        userService.dupCheckUserId(userId);
        return new ResponseEntity<>("사용할 수 있는 아이디입니다.", HttpStatus.OK);
    }
    @GetMapping(value = "/signup", params = "nickname")
    public ResponseEntity<String> dupCheckNickname(@RequestParam("nickname") String nickname) {
        userService.dupCheckNickname(nickname);
        return new ResponseEntity<>("사용할 수 있는 닉네임입니다.", HttpStatus.OK);
    }
}
