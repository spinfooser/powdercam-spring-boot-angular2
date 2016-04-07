package com.powderstats

import net.codestory.simplelenium.PageObject
import net.codestory.simplelenium.SeleniumTest
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.boot.test.WebIntegrationTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.context.web.WebAppConfiguration

@RunWith(SpringJUnit4ClassRunner::class)
@SpringApplicationConfiguration(classes = arrayOf(PowdercameraApplication::class))
@ActiveProfiles("test")
@WebIntegrationTest("server.port:0")
class BasicWorkflow : SeleniumTest() {

    @Value("\${local.server.port}")
    lateinit var port: String

    val home: Home = Home()

    override fun getDefaultBaseUrl(): String? {
        return "http://localhost:" + port
    }

    @Test
    fun TestWorkflow() {
        var page = goTo(home)
        page.find("a").withText("Winter Park Camera").should().contain("Winter Park Camera")
    }


    class Home : PageObject {
        override fun url(): String? {
            return "/"
        }
    }
}