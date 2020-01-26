package com.bizrun.appmain.utils;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZonedDateTime;

public class DateUtils {
    public static Timestamp getCurrentUTCTime() {
        int offsetInSeconds = ZonedDateTime.now().getOffset().getTotalSeconds() * 1000;
        return Timestamp.from(Instant.ofEpochMilli(Instant.now().toEpochMilli() + offsetInSeconds));
    }
}
