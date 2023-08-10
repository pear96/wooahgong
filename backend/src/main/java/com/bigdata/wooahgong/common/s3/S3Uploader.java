//package com.bigdata.wooahgong.common.s3;
//
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.CannedAccessControlList;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class S3Uploader {
//
//    private final AmazonS3Client amazonS3Client;
//
//    @Value("${cloud.aws.s3.bucket}")
//    public String bucket;  // S3 버킷 이름
//
//    public List<String> upload(List<MultipartFile> multipartFiles, String dirName, String target) {
//        System.out.println("multipartFiles 사이즈 : "+multipartFiles.size());
//        List<String> urls = new ArrayList<>();
//        for(MultipartFile multipartFile : multipartFiles){
//            System.out.println(multipartFile);
//            File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
//                    .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
//            String url = upload(uploadFile, dirName + "/" + target);
//            urls.add(url);
//        }
//        return urls;
//    }
//
//    // S3로 파일 업로드하기
//    private String upload(File uploadFile, String dirName) {
//        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
//        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
//        removeNewFile(uploadFile);
//        return uploadImageUrl;
//    }
//
//    // S3로 업로드
//    private String putS3(File uploadFile, String fileName) {
//        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
//        return amazonS3Client.getUrl(bucket, fileName).toString();
//    }
//
//    // 로컬에 저장된 이미지 지우기
//    private void removeNewFile(File targetFile) {
//        if (targetFile.delete()) {
//            log.info("File delete success");
//            return;
//        }
//        log.info("File delete fail");
//    }
//
//    // 로컬에 파일 업로드 하기
//    private Optional<File> convert(MultipartFile file) {
//        System.out.println("convert 유저 디렉토리 : "+System.getProperty("user.dir"));
//        // 파일을 굳이 만들지 않고 S3에 보낼 순 있음.
//        File convertFile = new File(System.getProperty("user.dir") + "/static" + file.getOriginalFilename());
////        String name = System.getProperty("user.dir") + "/static" + file.getOriginalFilename();
//
//        try {
//            if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
//                try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
//                    fos.write(file.getBytes());
//                }
//                return Optional.of(convertFile);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return Optional.empty();
//    }
//}