package com.bizrun.appmain.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder(toBuilder = true)
public class LoginCredentialDto implements Serializable {

    private static final long serialVersionUID = 1595446627814996129L;

    private String loginName;
    private String password;
}
