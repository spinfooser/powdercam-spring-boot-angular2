package com.powderstats

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod.GET
import org.springframework.web.bind.annotation.RestController

@RestController
public open class WinterParkController() {

    @Autowired
    constructor(winterPark: WinterParkService) : this() {
        winterParkService = winterPark;
    }

    @Autowired
    private lateinit var winterParkService: WinterParkService;

    @RequestMapping(value = "/api/winter-park", method = arrayOf(GET))
    public fun getImage(): ResponseEntity<PowderImage> {
        return ResponseEntity(winterParkService.getLatestImage(), HttpStatus.OK);
    }
}

