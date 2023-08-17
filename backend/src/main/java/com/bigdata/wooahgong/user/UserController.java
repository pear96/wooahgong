package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.user.dtos.request.*;
import com.bigdata.wooahgong.user.dtos.response.*;
import com.bigdata.wooahgong.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    @Operation(summary = "최종 회원가입",
            description = "1. email로 사용자 조회(중복 처리)\n" +
                    "2. 사용자 저장\n" +
                    "3. 분위기 조회\n" +
                    "4. 사용자의 분위기 저장")
    public ResponseEntity<String> signUp(@RequestBody SignUpReq signUpReq) {
        userService.signUp(signUpReq);
        return new ResponseEntity<>("회원 가입 완료.", HttpStatus.OK);
    }

    @GetMapping(value = "/signup", params = "userId")
    @Operation(summary = "아이디 중복조회",
            description = "1. 아이디로 사용자 조회")
    public ResponseEntity<String> dupCheckUserId(@RequestParam("userId") String userId) {
        userService.dupCheckUserId(userId);
        return new ResponseEntity<>("사용할 수 있는 아이디입니다.", HttpStatus.OK);
    }

    @GetMapping(value = "/signup", params = "nickname")
    @Operation(summary = "닉네임 중복조회",
            description = "1. 닉네임으로 사용자 조회")
    public ResponseEntity<String> dupCheckNickname(@RequestParam("nickname") String nickname) {
        userService.dupCheckNickname(nickname);
        return new ResponseEntity<>("사용할 수 있는 닉네임입니다.", HttpStatus.OK);
    }

    @GetMapping("/id")
    @Operation(summary = "이메일로 사용자 아이디 찾기",
            description = "1. 이메일로 사용자 조회")
    public ResponseEntity<FindIdRes> findId(@RequestParam("email") String email) {
        return new ResponseEntity<>(userService.findId(email), HttpStatus.OK);
    }

    @PatchMapping("/pwd")
    @Operation(summary = "비밀번호 찾기 1단계 인증메일 발송",
            description = "1. 아이디로 사용자 조회\n" +
                    "2. 이메일로 사용자 조회\n" +
                    "3. 이메일로 사용자 조회 한번 더..?\n" +
                    "4.사용자 인증코드 저장")
    public ResponseEntity<String> findPwSendEmail(@RequestBody FindPwSendEmailReq findPwSendEmailReq) {
        userService.findPwSendEmail(findPwSendEmailReq);
        return new ResponseEntity<>("메일을 발송했습니다.", HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 찾기 2단계 인증코드 확인",
            description = "1. 아이디로 사용자 조회")
    @PostMapping("/pwd")
    public ResponseEntity<String> findPwInsertCode(@RequestBody FindPwInsertCodeReq findPwInsertCodeReq) {
        return userService.findPwInsertCode(findPwInsertCodeReq);
    }

    @PatchMapping("/repwd")
    @Operation(summary = "비밀번호 찾기 3단계 비밀번호 재설정",
            description = "1. 아이디로 사용자 조회\n" +
                    "2. 새 비밀번호 저장")
    public ResponseEntity<String> resetPwd(@RequestBody ResetPwdReq resetPwdReq) {
        userService.resetPwd(resetPwdReq);
        return new ResponseEntity<>("비밀번호가 변경되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/{nickname}")
    @Operation(summary = "사용자 프로필 정보 조회",
            description = "1. 이메일로 사용자 조회\n" +
                    "2. 닉네임으로 사용자(프로필 주인) 조회\n" +
                    "3. 이메일로 사용자 조회 한번 더..?\n" +
                    "4.사용자 인증코드 저장")
    public ResponseEntity<GetUserInfoRes> getUserInfo(@RequestHeader("Authorization") String token, @PathVariable String nickname) {
        return new ResponseEntity<>(userService.getUserInfo(token, nickname), HttpStatus.OK);
    }

    @GetMapping("/{nickname}/update")
    @Operation(summary = "프로필 수정 페이지에 채울 사용자 정보 조회",
            description = "1. 이메일로 사용자 조회")
    public ResponseEntity<GetMyInfoRes> getMyInfoForUpdate(@RequestHeader("Authorization") String token, @PathVariable String nickname) {
        return new ResponseEntity<>(userService.getMyInfoForUpdate(token), HttpStatus.OK);
    }

    @GetMapping("/{nickname}/feeds")
    @Operation(summary = "유저가 올린 피드 조회 - 무한 스크롤",
            description = "1. 닉네임으로 올린 사용자 조회\n" +
                    "2. 사용자와 페이지로 수정된 날짜 기준으로 정렬해서 피드(Page) 가져옴\n" +
                    "+) 피드 이미지 정제")
    public ResponseEntity<List<GetMyFeedsRes>> getUserUploadedFeeds(@RequestHeader("Authorization") String token, @PathVariable String nickname, @PageableDefault(size = 9) Pageable pageable) {
        return new ResponseEntity<>(userService.getUserUploadedFeeds(token, nickname, pageable), HttpStatus.OK);
    }

    @GetMapping("/{nickname}/liked")
    @Operation(summary = "유저가 좋아한 피드 조회 - 무한 스크롤",
            description = "1. 닉네임으로 올린 사용자 조회\n" +
                    "2. 사용자와 페이지로 수정된 날짜 기준으로 정렬해서 좋아한 피드(Page) 가져옴\n" +
                    "+) 피드 이미지 정제")
    public ResponseEntity<List<GetMyFeedsRes>> getUserLikeFeeds(@RequestHeader("Authorization") String token, @PathVariable String nickname, @PageableDefault(size = 9) Pageable pageable) {
        return new ResponseEntity<>(userService.getUserLikeFeeds(token, nickname, pageable), HttpStatus.OK);
    }

    @GetMapping("/{nickname}/wished")
    @Operation(summary = "유저가 찜한 장소 조회 - 무한 스크롤",
            description = "1. 닉네임으로 올린 사용자 조회\n" +
                    "2. 사용자와 페이지로 수정된 날짜 기준으로 정렬해서 찜한 장소(Page) 가져옴\n" +
                    "+) 장소의 첫 번째 피드 이미지 정제")
    public ResponseEntity<List<GetMyPlacesRes>> getUserWishedPlaces(@RequestHeader("Authorization") String token, @PathVariable String nickname, @PageableDefault(size = 9) Pageable pageable) {
        return new ResponseEntity<>(userService.getUserWishedPlaces(token, nickname, pageable), HttpStatus.OK);
    }

    @PatchMapping("/{nickname}")
    @Operation(summary = "프로필 수정(닉네임, MBTI, 분위기)",
            description = "1. token으로 사용자 조회\n" +
                    "2. 해당 닉네임을 가진 사용자를 찾음\n" +
                    "3. 사용자의 분위기 다 지우고 다시 저장함")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @PathVariable String nickname,
                                                @RequestBody UpdateProfileReq updateProfileReq) {
        return new ResponseEntity<>(userService.updateProfile(token, updateProfileReq), HttpStatus.OK);
    }


    @PatchMapping(value = "/{nickname}/profileimg", consumes = {"multipart/form-data", "application/json"})
    @Operation(summary = "프로필 이미지 수정",
            description = "1. token으로 사용자 조회\n" +
                    "(닉네임 필요 없는데 또 받았네 애초에 path에도 필요 없잖아..?)")
    public ResponseEntity<String> updateProfileImg(@RequestHeader("Authorization") String token, @PathVariable String nickname,
                                                   @RequestPart(value = "image") MultipartFile image) {
        return new ResponseEntity<>(userService.updateProfileImg(token, image), HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/{nickname}")
    @Operation(summary = "탈퇴",
            description = "1. token으로 사용자 조회\n" +
                    "(닉네임 필요 없는데 또 받았네 애초에 path에도 필요 없잖아..?)")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String token, @PathVariable String nickname) {
        return new ResponseEntity<>(userService.deleteUser(token), HttpStatus.OK);
    }
}
