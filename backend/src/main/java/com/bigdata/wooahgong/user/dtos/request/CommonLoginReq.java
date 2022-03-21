package com.bigdata.wooahgong.user.dtos.request;

import lombok.Getter;

@Getter
public class CommonLoginReq {
    private String userId;
    private String password;

//    @Builder
//    public CommonLoginReq(String userId, String password){
//        this.userId = userId;
//        this.password = password;
//    }
}
