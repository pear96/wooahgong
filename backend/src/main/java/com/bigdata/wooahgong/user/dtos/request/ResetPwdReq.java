package com.bigdata.wooahgong.user.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPwdReq {
    private String userId;
    private String password;

}
