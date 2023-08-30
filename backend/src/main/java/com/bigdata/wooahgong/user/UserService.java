package com.bigdata.wooahgong.user;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.util.JwtTokenUtil;
import com.bigdata.wooahgong.email.EmailService;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.mood.entity.Mood;
import com.bigdata.wooahgong.mood.repository.MoodRepository;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.entity.PlaceWish;
import com.bigdata.wooahgong.place.repository.PlaceWishRepository;
import com.bigdata.wooahgong.user.dtos.request.*;
import com.bigdata.wooahgong.user.dtos.response.*;
import com.bigdata.wooahgong.user.entity.FeedLike;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.entity.UserMood;
import com.bigdata.wooahgong.user.repository.FeedLikeRepository;
import com.bigdata.wooahgong.user.repository.UserMoodRepository;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    private final MoodRepository moodRepository;
    private final UserRepository userRepository;
    private final UserMoodRepository userMoodRepository;
    private final FeedRepository feedRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final PlaceWishRepository placeWishRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    /**
     * Token으로 사용자 조회하는 함수.
     * Token으로 이메일을 추출하고, 해당 이메일을 가진 사용자를 찾는다.
     * @param token JWT
     * @return 사용자 객체
     */
    public User getUserByToken(String token) {
        String email = JwtTokenUtil.verifyToken(token);
        Optional<User> foundUser = userRepository.findByEmail(email);
        if (foundUser.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_OUR_USER);
        }
        return foundUser.get();
    }

    @Transactional
    public void signUp(SignUpReq commonSignUpReq) {
        commonSignUpReq.setPassword(passwordEncoder.encode(commonSignUpReq.getPassword()));
        User user = userRepository.findByEmail(commonSignUpReq.getEmail()).orElseGet(User::new);

        // 같은 이메일을 가진 유저가 존재한다.
        if (user.getUserSeq() != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        // 사용자 이메일이 유효하지 않다.
        if ("".equals(commonSignUpReq.getEmail()) || commonSignUpReq.getEmail() == null) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        // 유저 엔티티화 후 DB에 저장
        Random rnd = new Random();
        commonSignUpReq.setImageUrl("wooahgong_profile0" + (1 + rnd.nextInt(5))+".jpg");
        user = commonSignUpReq.toEntity();

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
        User user = userRepository.findByUserId(userId).orElseGet(User::new);
        if (user.getUserSeq() != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
    }

    // 닉네임 중복 체크
    public void dupCheckNickname(String nickname) {
        User user = userRepository.findByNickname(nickname).orElseGet(User::new);
        if (user.getUserSeq() != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
    }

    // 아이디 찾기
    public FindIdRes findId(String email) {
        User user = userRepository.findByEmail(email).orElseGet(User::new);
        if (user.getUserSeq() == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return FindIdRes.builder()
                .userId(user.getUserId()).provider(user.isProvider()).build();
    }

    // 비밀번호 찾기1 - 이메일 전송
    public void findPwSendEmail(FindPwSendEmailReq findPwSendEmailReq) {
        String userId = findPwSendEmailReq.getUserId();
        String email = findPwSendEmailReq.getEmail();

        // 에러 핸들링
        User user = userRepository.findByUserIdOrEmail(userId, email).orElseThrow(() ->
                new CustomException(ErrorCode.EMAIL_NOT_FOUND));
        emailService.sendEmailForPassword(user, email);
    }

    // 비밀번호 찾기2 인증코드 확인
    public ResponseEntity<String> findPwInsertCode(FindPwInsertCodeReq findPwInsertCodeReq) {
        String userId = findPwInsertCodeReq.getUserId();
        String authCode = findPwInsertCodeReq.getAuthCode();
        User user = userRepository.findByUserId(userId).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));
        return emailService.checkEmailAuthCodeForPassword(user, authCode);
    }

    public void resetPwd(ResetPwdReq resetPwdReq) {
        String userId = resetPwdReq.getUserId();
        String password = resetPwdReq.getPassword();
        User user = userRepository.findByUserId(userId).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        user.resetPwd(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public GetUserInfoRes getUserInfo(String token, String nickname) {
        // 토큰으로 유저 찾기
        User user = getUserByToken(token);
        // 닉네임으로 유저 찾기
        User Owner = userRepository.findByNickname(nickname).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        // 프로필 주인인지 확인
        boolean isOwner = user.getNickname().equals(nickname);

        // 프로필 정보 생성
        int feedsCnt = Owner.getFeeds().size();
        int likedCnt = Owner.getFeedLikes().size();
        int bookmark = Owner.getPlaceWishes().size();
        List<String> moods = new ArrayList<>();
        for (UserMood userMood : Owner.getUserMoods()) {
            moods.add(userMood.getMood().getMood());
        }

        return GetUserInfoRes.builder()
                .isOwner(isOwner)
                .feedsCnt(feedsCnt).likedCnt(likedCnt).bookmarkedCnt(bookmark)
                .moods(moods)
                .mbti(Owner.getMbti())
                .image(Owner.getImageUrl())
                .build();
    }

    /**
     * 프로필 수정 페이지로 갈 때, 사용자의 정보 가져가서 미리 입력해둬야함
     * 닉네임은 왜 보내주는거지..??(지웠음)
     * @param token JWT
     * @return 사용자 정보
     */
    public GetMyInfoRes getMyInfoForUpdate(String token) {
        // 토큰으로 유저 찾기
        User user = getUserByToken(token);

        List<String> moods = new ArrayList<>();
        for (UserMood userMood : user.getUserMoods()) {
            moods.add(userMood.getMood().getMood());
        }

        return GetMyInfoRes.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .profileImg(user.getImageUrl())
                .mbti(user.getMbti()).moods(moods).provider(user.isProvider())
                .build();
    }

    public List<GetMyFeedsRes> getUserUploadedFeeds(String token, String nickname, Pageable pageable) {
        JwtTokenUtil.verifyToken(token);

        User Owner = userRepository.findByNickname(nickname).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        Page<Feed> pages = feedRepository.findByUserOrderByModifiedDateDesc(Owner, pageable);

        // DTO에 정제해서 담아 반환하려고
        List<GetMyFeedsRes> getMyFeedsResList = new ArrayList<>();

        for (Feed feed : pages) {
            getMyFeedsResList.add(GetMyFeedsRes.builder()
                    .feedSeq(feed.getFeedSeq())
                    .imageUrl(feed.getThumbnail())
                    .placeSeq(feed.getPlaceSeq())
                    .build());
        }
        return getMyFeedsResList;
    }

    public List<GetMyFeedsRes> getUserLikeFeeds(String token, String nickname, Pageable pageable) {
        JwtTokenUtil.verifyToken(token);

        User Owner = userRepository.findByNickname(nickname).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        Page<FeedLike> pages = feedLikeRepository.findByUserOrderByModifiedDateDesc(Owner, pageable);

        List<GetMyFeedsRes> getMyFeedsResList = new ArrayList<>();
        for (FeedLike feedLike : pages) {
            Feed feed = feedLike.getFeed();
            getMyFeedsResList.add(GetMyFeedsRes.builder()
                    .feedSeq(feed.getFeedSeq())
                    .imageUrl(feed.getThumbnail())
                    .placeSeq(feed.getPlaceSeq())
                    .build());
        }
        return getMyFeedsResList;
    }

    public List<GetMyPlacesRes> getUserWishedPlaces(String token, String nickname, Pageable pageable) {
        JwtTokenUtil.verifyToken(token);

        User Owner = userRepository.findByNickname(nickname).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        Page<PlaceWish> pages = placeWishRepository.findByUserOrderByModifiedDateDesc(Owner, pageable);

        List<GetMyPlacesRes> getMyPlacesResList = new ArrayList<>();
        for (PlaceWish placeWish : pages) {
            Place place = placeWish.getPlace();
            getMyPlacesResList.add(GetMyPlacesRes.builder()
                    .placeSeq(place.getPlaceSeq())
                    .thumbnail(place.getFeeds().get(0).getThumbnail())
                    .build());
        }
        return getMyPlacesResList;
    }

    @Transactional
    public String updateProfile(String token, UpdateProfileReq updateProfileReq) {
        // 토큰으로 유저 찾기
        User user = getUserByToken(token);

        // 닉네임 변경
        if (!user.getNickname().equals(updateProfileReq.getNickname())) {
            // 해당 닉네임을 가진 유저를 찾는다.
            User nickUser = userRepository.findByNickname(updateProfileReq.getNickname()).orElseGet(User::new);
            // 없으면 닉네임을 세팅
            if(nickUser.getUserSeq() == null){
                user.setNickname(updateProfileReq.getNickname());
            }
            // 있으면 오류
            else{
                throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
            }
        }
        // MBTI 변경
        if (!user.getMbti().equals(updateProfileReq.getMbti())) {
            user.setMbti(updateProfileReq.getMbti());
        }
        // UserMood 지우기
        userMoodRepository.deleteAllByUser(user);
        // 다시 삽입
        for (String s : updateProfileReq.getMoods()) {
            Mood mood = moodRepository.findByMoodContaining(s).orElseThrow(() ->
                    new CustomException(ErrorCode.MOOD_NOT_FOUND));
            userMoodRepository.save(UserMood.builder().mood(mood).user(user).build());
        }
        // 이미 영속성 컨텍스트에서 관리되고 있기 때문에 save호출 없이도 DB에 변경이 반영됨.
//        userRepository.save(user);
        return "프로필 업데이트 완료";
    }

    @Transactional
    public String updateProfileImg(String token, MultipartFile image) {
        // 토큰으로 유저 찾기
        User user = getUserByToken(token);
//        user.setImageUrl(imageService.uploadImage(user.getUserId(), image));
        return "안만들거임";
    }

    @Transactional
    public String deleteUser(String token) {
        User user = getUserByToken(token);
        userRepository.delete(user);
        return "회원 탈퇴 성공";
    }
}
