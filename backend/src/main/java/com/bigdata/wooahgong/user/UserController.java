package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.user.dtos.request.CommonLoginReq;
import com.bigdata.wooahgong.user.dtos.response.CommonLoginRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<CommonLoginRes> login(@RequestBody CommonLoginReq commonLoginReq) {
        return new ResponseEntity<CommonLoginRes>(userService.findUser(commonLoginReq.getUserId(), commonLoginReq.getPassword()), HttpStatus.OK);
    }

}
