package com.bigdata.wooahgong.email;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.email.entity.Email;
import com.bigdata.wooahgong.email.repository.EmailRepository;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import static com.bigdata.wooahgong.common.exception.ErrorCode.DUPLICATE_RESOURCE;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;

    public String createAuthCode() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }

    public LocalDateTime makeTimeLimit(){
        LocalDateTime now = LocalDateTime.now();

        return now.plusMinutes(10);
    };

    public ResponseEntity checkEmail(String email) {
        // 해당 이메일을 가진 사용자가 존재한다면 에러를 발생한다.
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            throw new CustomException(DUPLICATE_RESOURCE);
        }
        // 해당 이메일의 사용자는 없지만 인증을 시도한 경우 인증 코드 갱신
        String authCode = createAuthCode();
        // 시간 제한 설정. 현재 시간에서 10분 후 까지
        LocalDateTime timeLimit = makeTimeLimit();
        Optional<Email> checkedEmail = emailRepository.findByEmail(email);
        if (checkedEmail.isPresent()) {
//            emailRepository.save()
        } else {
            Email newEmail = Email.builder()
                    .email(email)
                    .authCode(authCode)
                    .timeLimit(timeLimit)
                    .build();
            emailRepository.save(newEmail);
        }
        return ResponseEntity.status(200).body("인증 코드 발송");


    }
}
