import redis from 'ioredis';

class Redis {
    constructor (redisConfig) {
        this.redis = new redis(redisConfig)
    }

    async get (key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    async set (key, data, maxAge = 7 * 24 * 60 * 60 * 1000) {
        try {
            await this.redis.set(key, JSON.stringify(data), 'EX', maxAge);
            return '保存成功';
        } catch (error) {
            console.log(error);
        }
    }

    async delete (key) {
        await this.redis.del(key);
    }
}

export default Redis;