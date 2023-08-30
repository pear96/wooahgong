package com.bigdata.wooahgong;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.io.File;
import java.net.URL;

@SpringBootApplication
@EnableJpaAuditing
public class Application {

    public static void main(String[] args) {
        File publicKeyFile = new File("key.pem");
        System.setProperty("PUBLIC_KEY_FILE", publicKeyFile.getAbsolutePath());
        new SpringApplicationBuilder(Application.class)
                .run(args);
    }
}

