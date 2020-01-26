package com.bizrun.appmain.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContentDataService {
    List<Object> findAll(String contentDataType);
}
