package com.bigdata.wooahgong.user.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPwSendEmailReq {
    private String userId;
    private String email;

}
