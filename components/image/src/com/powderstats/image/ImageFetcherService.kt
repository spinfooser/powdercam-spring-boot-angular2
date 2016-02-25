package com.powderstats.image

import org.apache.commons.codec.binary.Base64OutputStream
import org.apache.commons.io.IOUtils
import org.springframework.stereotype.Component
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.net.URL

@Component
open class ImageFetcherService {
    public open fun fetchImage(urlToFetch: URL): InputStream {
        var connection = urlToFetch.openConnection();
        return connection.getInputStream()
    }

    public open fun encodeStreamAsBase64(image: InputStream): String {
        var byteOutputStream = ByteArrayOutputStream()
        var base64EncodeStream = Base64OutputStream(byteOutputStream)
        IOUtils.copy(image, base64EncodeStream)
        return byteOutputStream.toString()
    }
}