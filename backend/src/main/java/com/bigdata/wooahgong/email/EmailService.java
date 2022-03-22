package com.bigdata.wooahgong.email;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.email.entity.Email;
import com.bigdata.wooahgong.email.repository.EmailRepository;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    private final UserRepository userRepository;
    private final EmailRepository emailRepository;

    // 이메일 인증 발송
    private MimeMessage sendAuthCodeEmail(String to, String authCode)throws Exception{
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("우아공 이메일 인증"); //제목

        String msgg="";
        msgg += "<!DOCTYPE html>";
        msgg += "<html>";
        msgg += "<head>";
        msgg += "</head>";
        msgg += "<body>";
        msgg +=
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 550px; height: 600px; border-top: 4px solid #9088F3; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 550;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">우리만 아는 공간</span><br />"																													+
                        "		<span style=\"color: #9088F3\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																													+
                        "		안녕하세요.<br />"																																													+
                        "		아래 <b style=\"color: #02b875\">'인증코드'</b> 를 화면에 올바르게 입력한 후 다음 단계를 진행해주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "	</p>"																																																	+
                        "	<a style=\"color: #222; text-decoration: none; text-align: center;\""																																	+
                        "		<p"																																																	+
                        "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #9088F3; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                        authCode + "			</p>"																																														+
                        "	</a>"																																																	+
                        "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>"																																		+
                        " </div>";
        msgg += "</body>";
        msgg += "</html>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("wooahgong@gmail.com","우리만 아는 공간"));//보내는 사람

        return message;
    }

    // 인증코드 생성
    public String createAuthCode() {
        StringBuffer code = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    code.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    code.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    code.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return code.toString();
    }

    // 만료시간 생성
    public LocalDateTime createTimeLimit(){
        LocalDateTime now = LocalDateTime.now();
        return now.plusMinutes(10);
    };


    // 이메일 확인후 인증코드, 만료시간 설정
    public ResponseEntity<Object> checkEmail(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            // 해당 이메일을 가진 사용자가 존재한다면 에러를 발생한다.
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        // 해당 이메일의 사용자는 없지만 인증을 시도한 경우 인증 코드 갱신
        String newAuthCode = createAuthCode();
        // 시간 제한 설정. 현재 시간에서 10분 후 까지
        LocalDateTime newTimeLimit = createTimeLimit();
        // 이메일 인증을 한 적이 있는지 확인한다.
        Optional<Email> checkingEmail = emailRepository.findByEmail(email);
        if (checkingEmail.isPresent()) {
            // 이메일을 인증한 적이 있다면 코드랑 시간제한만 바꿔서 저장
            Email checkedEmail = checkingEmail.get();
            checkedEmail.setAuthCode(newAuthCode);
            checkedEmail.setTimeLimit(newTimeLimit);
            emailRepository.save(checkedEmail);
        } else {
            Email newEmail = Email.builder()
                    .email(email)
                    .authCode(newAuthCode)
                    .timeLimit(newTimeLimit)
                    .build();
            emailRepository.save(newEmail);
        }
        // 보낼 이메일 생성
        MimeMessage message = sendAuthCodeEmail(email, newAuthCode);
        emailSender.send(message);

        return ResponseEntity.status(200).body("인증 코드 발송");


    }
}
