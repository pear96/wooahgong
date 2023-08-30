package com.bigdata.wooahgong;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.net.URL;

@SpringBootApplication
@EnableJpaAuditing
public class Application {

    public static void main(String[] args) {
        URL publicKeyUrl = Application.class.getResource("/key.pem");
        System.setProperty("PUBLIC_KEY_FILE", publicKeyUrl.toString());
        new SpringApplicationBuilder(Application.class)
                .run(args);
    }
}

