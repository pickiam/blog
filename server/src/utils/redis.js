import redis from 'ioredis';

class Redis {
    constructor (redisConfig) {
        this.redis = new redis(redisConfig)
    }

    async get (key) {

    }

    async set (key) {

    }

    async delete (key) {

    }
}

export default Redis;