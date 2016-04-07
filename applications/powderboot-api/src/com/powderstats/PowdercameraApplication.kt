package com.powderstats

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer
import org.springframework.boot.context.embedded.ErrorPage
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.stereotype.Component

@ComponentScan("com.powderstats")
@SpringBootApplication
public open class PowdercameraApplication

fun main(args: Array<String>) {
    SpringApplication.run(PowdercameraApplication::class.java, *args);
}

@Configuration
public open class SpringSecurityWebAppConfig : WebSecurityConfigurerAdapter() {
    override protected fun configure(http: HttpSecurity) {
        http
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .anyRequest().permitAll();
    }
}

@Component
class WebConfiguration : EmbeddedServletContainerCustomizer {
    override fun customize(configurableEmbeddedServletContainer: ConfigurableEmbeddedServletContainer) {
        configurableEmbeddedServletContainer.addErrorPages(ErrorPage(HttpStatus.NOT_FOUND, "/index.html"));
    }
}