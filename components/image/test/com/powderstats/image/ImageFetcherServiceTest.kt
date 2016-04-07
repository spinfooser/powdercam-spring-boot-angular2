package com.powderstats

import com.powderstats.image.ImageFetcherService
import org.junit.Before
import org.junit.Test
import org.junit.Assert;
import org.junit.Assert.assertThat

import org.mockito.Mockito
import java.io.InputStream
import java.net.URL
import java.net.URLConnection

import org.apache.commons.io.IOUtils
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`

import org.hamcrest.Matchers;
import org.hamcrest.Matchers.equalTo
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import javax.imageio.ImageIO

class ImageFetcherServiceTest {

    @Test
    fun testGetLatestImage() {
        var urlToFetch = URL("http://www.schaik.com/pngsuite/basn6a16.png")
        var service = ImageFetcherService();

        var actualInputStream = service.fetchImage(urlToFetch);
        var byteOutputStream = ByteArrayOutputStream()
        IOUtils.copy(actualInputStream, byteOutputStream)

        assertThat(byteOutputStream.toString().subSequence(0, 4).toString(), equalTo("�PNG"))
    }

}

