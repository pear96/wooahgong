package com.bigdata.wooahgong.common.util;

import ch.qos.logback.classic.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class TimeTraceAop {

    private final Logger logger = (Logger) LoggerFactory.getLogger(this.getClass().getSimpleName());

    @Around("execution(* com.bigdata.wooahgong..*(..)) || @annotation(org.springframework.transaction.annotation.Transactional)")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        logger.info("START : " + joinPoint.toString());

        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            logger.info("END : " + joinPoint + " " + timeMs + "ms");
        }
    }
}
