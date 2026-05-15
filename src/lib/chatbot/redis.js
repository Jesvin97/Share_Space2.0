import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn('Upstash Redis credentials missing. Chatbot caching and rate limiting will be disabled.');
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Checks if the chatbot should be disabled based on cost limits.
 */
export async function isChatbotDisabled() {
  if (process.env.CHATBOT_DISABLED === 'true') return true;
  
  try {
    const totalCost = await redis.get('chatbot:total_cost') || 0;
    const limit = parseFloat(process.env.CHATBOT_COST_LIMIT || '1.00');
    return totalCost >= limit;
  } catch (error) {
    console.error('Failed to check chatbot status from Redis:', error);
    return false;
  }
}

/**
 * Tracks token usage and estimates cost.
 * text-embedding-3-small: $0.00002 / 1k tokens
 * gpt-4o-mini: $0.150 / 1M input tokens, $0.600 / 1M output tokens
 */
export async function trackUsage(tokens, type = 'chat_input') {
  let cost = 0;
  if (type === 'embedding') {
    cost = (tokens / 1000) * 0.00002;
  } else if (type === 'chat_input') {
    cost = (tokens / 1000000) * 0.150;
  } else if (type === 'chat_output') {
    cost = (tokens / 1000000) * 0.600;
  }

  try {
    await redis.incrbyfloat('chatbot:total_cost', cost);
    await redis.incrby('chatbot:total_tokens', tokens);
  } catch (error) {
    console.error('Failed to track usage in Redis:', error);
  }
  
  return cost;
}
