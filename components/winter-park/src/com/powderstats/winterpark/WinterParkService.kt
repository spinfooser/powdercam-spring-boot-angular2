package com.powderstats.winterpark

import com.powderstats.image.ImageFetcherService
import com.powderstats.image.PowderImage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.net.URL

@Component
public open class WinterParkService {

    @Autowired constructor(ifs: ImageFetcherService) {
        this.imageFetcherService = ifs
    }

    public open lateinit var imageFetcherService: ImageFetcherService;

    public open fun getLatestImage(): PowderImage {
        var image = imageFetcherService.fetchImage(URL("http://cams.winterparkresort.com/snow-stake-cam.jpg"))

        return PowderImage(image = imageFetcherService.encodeStreamAsBase64(image));
    }


}