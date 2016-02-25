package com.powderstats.winterpark

import com.powderstats.image.PowderImage
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.mock.web.MockServletContext
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.web.servlet.MockMvc
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`

import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

import javax.json.Json.*

@RunWith(SpringJUnit4ClassRunner::class)
@SpringApplicationConfiguration(classes = arrayOf(MockServletContext::class))
@WebAppConfiguration
open class WinterParkControllerTest {

    public var mockMvc: MockMvc? = null;

    public lateinit var winterParkService: WinterParkService;

    @Before
    public fun setUp() {
        winterParkService = Mockito.mock(WinterParkService::class.java);
        mockMvc = standaloneSetup(WinterParkController(winterParkService)).build();
    }

    @Test
    public fun testApi() {
        `when`(winterParkService.getLatestImage()).thenReturn(PowderImage(image = "abcd"));
        mockMvc?.perform(get("/api/winter-park"))
                ?.andExpect(content().json(createObjectBuilder().add("image", "abcd").build().toString()));

        `verify`(winterParkService, times(1)).getLatestImage();
    }
}

