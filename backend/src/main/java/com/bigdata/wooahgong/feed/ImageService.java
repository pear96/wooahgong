package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.feed.entity.FeedImage;
import com.bigdata.wooahgong.feed.repository.FeedImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${image.dir}")
    private String IMG_DIR;

    public List<String> uploadImg(String userId, List<MultipartFile> images){
        List<String> savedUrls = new ArrayList<>();
        for(MultipartFile img : images) {
            if(!img.isEmpty()) {
                try {
                    // 모든 파일은 byte의 연속으로 저장된다. images에는 업로드한 파일의 내용, 메타데이터를 포합한다.
                    // getBytes()는 MultipartFile의 내용을 바이트 배열로 변환한다.
                    byte[] bytes = img.getBytes();
                    // 주어진 경로 문자열로 Path 객체를 생성한다.
                    Path path = Paths.get(UUID.randomUUID().toString() + "_" + img.getOriginalFilename());
                    savedUrls.add(path.toString());
                    Files.write(path, bytes);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return savedUrls;
    }

    public List<String> getImages(List<String> imageUrls) {
        List<String> images = new ArrayList<>();
        for(String imageUrl : imageUrls) {
            images.add(encodeImageToBase64(IMG_DIR + imageUrl));
        }
        return images;
    }

    public String getImage(String imageUrl) {
        return encodeImageToBase64(IMG_DIR + imageUrl);
    }


    String encodeImageToBase64(String imageUrl) {
        Path path = Path.of(imageUrl);
        try {
            String mimeType = Files.probeContentType(path);
            byte[] imageBytes = Files.readAllBytes(path);
            return "data:" + mimeType + ";base64," +
                    Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
}
