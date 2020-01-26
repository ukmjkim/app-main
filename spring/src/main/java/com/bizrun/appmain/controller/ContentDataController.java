package com.bizrun.appmain.controller;

import com.bizrun.appmain.service.ContentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ContentDataController {
    @Autowired
    private ContentDataService contentDataService;

    @GetMapping("/content-data")
    public List<Object> getAllData(@RequestParam(required = true) String contentDataType) {
        return contentDataService.findAll(contentDataType);
    }

}
