//package com.bigdata.wooahgong.common.util;
//
//import ch.qos.logback.classic.Logger;
//import org.hibernate.EmptyInterceptor;
//import org.slf4j.LoggerFactory;
//
//public class TimeTrackHibernateInterceptor extends EmptyInterceptor {
//    private final Logger logger = (Logger) LoggerFactory.getLogger(this.getClass().getSimpleName());
//
//    @Override
//    public String onPrepareStatement(String sql) {
//        long start = System.currentTimeMillis();
//        String result = super.onPrepareStatement(sql);
//        long end = System.currentTimeMillis();
//
////        logger.info("SQL Executing Time : " + (end-start) + "ms");
//        return result;
//    }
//}
