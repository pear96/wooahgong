package com.bigdata.wooahgong.user;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.s3.S3Service;
import com.bigdata.wooahgong.common.util.JwtTokenUtil;
import com.bigdata.wooahgong.email.EmailService;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.mood.entity.Mood;
import com.bigdata.wooahgong.mood.repository.MoodRepository;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.entity.PlaceWish;
import com.bigdata.wooahgong.place.repository.PlaceWishRepository;
import com.bigdata.wooahgong.user.dtos.request.FindPwSendEmailReq;
import com.bigdata.wooahgong.user.dtos.request.ResetPwdReq;
import com.bigdata.wooahgong.user.dtos.request.SignUpReq;
import com.bigdata.wooahgong.user.dtos.request.UpdateProfileReq;
import com.bigdata.wooahgong.user.dtos.response.GetMyFeedsRes;
import com.bigdata.wooahgong.user.dtos.response.GetMyInfoRes;
import com.bigdata.wooahgong.user.dtos.response.GetMyPlacesRes;
import com.bigdata.wooahgong.user.dtos.response.GetUserInfoRes;
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

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private final S3Service s3Service;

    public String getEmailByToken(String token) {
        JWTVerifier verifier = JwtTokenUtil.getVerifier();
        if("".equals(token)) {
            throw new CustomException(ErrorCode.NOT_OUR_USER);
        }
        JwtTokenUtil.handleError(token);
        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        return decodedJWT.getSubject();
    }

    public User getUserByToken(String token) {
        String email = getEmailByToken(token);
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
        // 에러 핸들링
        if (user.getUserSeq() != null) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        if ("".equals(commonSignUpReq.getEmail()) || commonSignUpReq.getEmail() == null) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        // 유저 엔티티화 후 DB에 저장
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
    public String findId(String email) {
        User user = userRepository.findByEmail(email).orElseGet(User::new);
        if (user.getUserSeq() == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return user.getUserId();
    }

    // 비밀번호 찾기1 - 이메일 전송
    public void findPwSendEmail(FindPwSendEmailReq findPwSendEmailReq) {
        String userId = findPwSendEmailReq.getUserId();
        String email = findPwSendEmailReq.getEmail();

        // 에러 핸들링
        userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException(ErrorCode.EMAIL_NOT_FOUND));
        userRepository.findByUserId(userId).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));
        // 에러 없이 지나왔다면
        User user = userRepository.findByEmail(email).get();
        emailService.sendEmailForPassword(user, email);
    }

    // 비밀번호 찾기2 인증코드 확인
    public ResponseEntity findPwInsertCode(String userId, String authCode) {
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
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 닉네임으로 유저 찾기
        User Owner = userRepository.findByNickname(nickname).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        boolean isOwner = user.getNickname().equals(nickname);
        int feedsCnt = Owner.getFeeds().size();
        int likedCnt = Owner.getFeedLikes().size();
        int bookmark = Owner.getPlaceWishes().size();
        List<String> moods = new ArrayList<>();
        for (UserMood userMood : Owner.getUserMoods()) {
            moods.add(userMood.getMood().getMood());
        }
        return GetUserInfoRes.builder()
                .isOwner(isOwner).feedsCnt(feedsCnt)
                .likedCnt(likedCnt).bookmarkedCnt(bookmark)
                .moods(moods).mbti(Owner.getMbti()).image(Owner.getImageUrl()).build();
    }

    public GetMyInfoRes getMyInfo(String token, String nickname) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        List<String> moods = new ArrayList<>();
        for (UserMood userMood : user.getUserMoods()) {
            moods.add(userMood.getMood().getMood());
        }
        return GetMyInfoRes.builder()
                .userId(user.getUserId()).nickname(user.getNickname()).profileImg(user.getImageUrl())
                .mbti(user.getMbti()).moods(moods).provider(user.isProvider()).build();
    }

    public List<GetMyFeedsRes> getMyFeeds(String token, String nickname, Pageable pageable) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        Page<Feed> pages = feedRepository.findByUserOrderByModifiedDateDesc(user, pageable);
        List<GetMyFeedsRes> getMyFeedsResList = new ArrayList<>();
        for (Feed feed : pages) {
            String image = null;
            if (feed.getFeedImages().size() != 0) {
                image = feed.getFeedImages().get(0).getImageUrl();
            }
            getMyFeedsResList.add(GetMyFeedsRes.builder()
                    .feedSeq(feed.getFeedSeq()).imageUrl(image).build());
        }
        return getMyFeedsResList;
    }

    public List<GetMyFeedsRes> getMyLikeFeeds(String token, String nickname, Pageable pageable) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        Page<FeedLike> pages = feedLikeRepository.findByUserOrderByModifiedDateDesc(user, pageable);
        List<GetMyFeedsRes> getMyFeedsResList = new ArrayList<>();
        for (FeedLike feedLike : pages) {
            Feed feed = feedLike.getFeed();
            String image = null;
            if (feed.getFeedImages().size() != 0) {
                image = feed.getFeedImages().get(0).getImageUrl();
            }
            getMyFeedsResList.add(GetMyFeedsRes.builder()
                    .feedSeq(feed.getFeedSeq()).imageUrl(image).build());
        }
        return getMyFeedsResList;
    }

    @Transactional
    public List<GetMyPlacesRes> getMyWishedPlaces(String token, String nickname, Pageable pageable) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        Page<PlaceWish> pages = placeWishRepository.findByUserOrderByModifiedDateDesc(user, pageable);
        List<GetMyPlacesRes> getMyPlacesResList = new ArrayList<>();
        for (PlaceWish placeWish : pages) {
            Place place = placeWish.getPlace();
            String image = null;
            // 피드가 존재할때만
            if (place.getFeeds().size() != 0) {
                Feed feed = place.getFeeds().get(0);
                // 피드에 사진이 있을 경우에만
                if (feed.getFeedImages().size() != 0) {
                    image = feed.getFeedImages().get(0).getImageUrl();
                }
            }
            getMyPlacesResList.add(GetMyPlacesRes.builder()
                    .placeSeq(place.getPlaceSeq()).thumbnail(image).build());
        }
        return getMyPlacesResList;
    }

    @Transactional
    public String updateProfile(String token, String nickname, UpdateProfileReq updateProfileReq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        if (!user.getNickname().equals(updateProfileReq.getNickname())) {
            user.setNickname(updateProfileReq.getNickname());
        }
        if(!user.getMbti().equals(updateProfileReq.getMbti())){
            user.setMbti(updateProfileReq.getMbti());
        }
        // UserMood 지우기
        userMoodRepository.deleteAllByUser(user);
        // 다시 삽입
        for(String s : updateProfileReq.getMoods()){
            Mood mood = moodRepository.findByMoodContaining(s).orElseThrow(()->
                    new CustomException(ErrorCode.MOOD_NOT_FOUND));
            userMoodRepository.save(UserMood.builder().mood(mood).user(user).build());
        }
        userRepository.save(user);
        return "프로필 업데이트 완료";
    }

    @Transactional
    public String updateProfileImg(String token, String nickname, MultipartFile image) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        List<MultipartFile> images = new ArrayList<>();
        images.add(image);
        List<String> urls = null;
        try {
            urls = s3Service.uploadImg(images, "/profile");
        } catch (IOException e) {
            e.printStackTrace();
        }
        String url = urls.get(0);
        user.setImageUrl(url);
        return url;
    }

    @Transactional
    public String deleteUser(String token, String nickname) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        userRepository.delete(user);
        return "회원 탈퇴 성공";
    }
}
