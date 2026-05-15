import { redis } from './redis.js';

/**
 * IP-based rate limiting using a sliding window.
 * Default: 5 requests per 10 minutes.
 */
export async function rateLimit(ip, limit = 5, windowInSeconds = 600) {
  if (!ip) return { success: true }; // Fallback if IP is missing

  const key = `ratelimit:${ip}`;
  
  try {
    const current = await redis.get(key);
    
    if (current && parseInt(current) >= limit) {
      return { 
        success: false, 
        limit, 
        remaining: 0,
        reset: await redis.ttl(key)
      };
    }

    const multi = redis.pipeline();
    multi.incr(key);
    if (!current) {
      multi.expire(key, windowInSeconds);
    }
    const results = await multi.exec();
    const newValue = results[0];

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - newValue),
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    return { success: true }; // Fail open to avoid blocking users on Redis failure
  }
}
