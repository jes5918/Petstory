package com.ssafy.petstory.controller;

import com.ssafy.petstory.domain.BoardHashtag;
import com.ssafy.petstory.dto.BoardQueryDto;
import com.ssafy.petstory.service.BoardHashtagService;
import com.ssafy.petstory.service.HashtagService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HashtagController {

    private final BoardHashtagService boardHashtagService;
    private final HashtagService hashtagService;

    @Data
    @AllArgsConstructor
    static  class Result<T>{
        private T data;
    }


    /**
     * 해시태그로 게시글 검색
     */
    @GetMapping("/api/hashtag/findOne")
    public Result<BoardQueryDto> findOne(String hashtagName){

        return new Result(hashtagService.findBoardByHashtag(hashtagName));
    }

    /**
     * 해시태그 자동완성
     *  : like query
     */
}
