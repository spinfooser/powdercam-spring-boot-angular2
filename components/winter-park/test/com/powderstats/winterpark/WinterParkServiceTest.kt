package com.powderstats

import com.powderstats.image.ImageFetcherService
import com.powderstats.winterpark.WinterParkService
import org.apache.commons.io.IOUtils
import org.hamcrest.Matchers
import org.junit.Assert.assertThat
import org.junit.Before
import org.junit.Test
import org.mockito.Mockito
import java.io.FileInputStream

private fun <T> anyObject(): T {
    Mockito.anyObject<T>()
    return uninitialized()
}

private fun <T> uninitialized(): T = null as T

class WinterParkServiceTest {

    private lateinit var imageFetcherService: ImageFetcherService;
    private lateinit var winterParkService: WinterParkService

    @Before
    fun setUp() {
        imageFetcherService = Mockito.mock(ImageFetcherService::class.java)
        winterParkService = WinterParkService(imageFetcherService)
    }

    @Test
    fun testGetLatestImage() {
        Mockito.`when`(imageFetcherService.fetchImage(anyObject())).thenReturn(FileInputStream("test/resources/firefox.png"));
        Mockito.`when`(imageFetcherService.encodeStreamAsBase64(anyObject())).thenReturn("encoded-base-64-string");

        var powderImage = winterParkService.getLatestImage();
        assertThat(powderImage.image, Matchers.equalTo("encoded-base-64-string"))
    }
}