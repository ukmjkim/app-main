package com.bizrun.appmain.filter;

import com.bizrun.appmain.dto.RoleEnum;
import com.bizrun.appmain.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthorizationFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        if (!isPathProtected(httpRequest.getRequestURI())) {
            chain.doFilter(request, response);
            return;
        } else {
            Object currentUser = httpRequest.getSession().getAttribute("currentUser");
            if (currentUser instanceof UserDto) {
                UserDto myUser = (UserDto)currentUser;
                if (!StringUtils.isEmpty(myUser.getRoleName()) && !StringUtils.isEmpty(myUser.getUserName()) && RoleEnum.fromRoleName(myUser.getRoleName()).canLogin()) {
                    chain.doFilter(request, response);
                    return;
                }
            }
        }
        ((HttpServletResponse)response).setStatus(HttpStatus.UNAUTHORIZED.value());
    }

    private boolean isPathProtected(String uri) {
        if (uri.equalsIgnoreCase("/api/v1/login")) {
            return false;
        }

        if (!uri.toLowerCase().startsWith("/api/")) {
            return false;
        }
        return true;
    }
}
