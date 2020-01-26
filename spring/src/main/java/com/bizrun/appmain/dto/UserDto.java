package com.bizrun.appmain.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder(toBuilder = true)
public class UserDto implements Serializable {

    private static final long serialVersionUID = -2740052950954941918L;

    private String userName;
    private String roleName;
}
