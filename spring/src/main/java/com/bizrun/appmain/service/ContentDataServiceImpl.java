package com.bizrun.appmain.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContentDataServiceImpl implements ContentDataService {
    public List<Object> findAll(String contentDataType) {
        switch (contentDataType) {
            case "employee":

        }
        return new ArrayList<>();
    }
}
