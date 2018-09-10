import schedule from 'node-schedule';
import articleModel from '../models/article/index.js';
import config from '../config/index.js'
import redis from './redis.js'
export const artilceInfo = {
    getDraftPostFromMysql: async () => {
        let selectResult = await articleModel.findAll({
            where: config.draftPostRedisKey
        });
        if (selectResult && selectResult.length > 0) {
            let redisPost = selectResult[0];
            return {
                
            }
        }
        return {};
    },
    redisToMysqlTask: async () => {
        const draftRedis = new redis(config.redis);
        let rule = new schedule.RecurrenceRule();
        rule.hour = 3;
        rule.minute = 0;

        schedule.scheduledJob(rule, async () =>{
            let redisPost = await draftRedis.get(config.draftPostRedisKey);
            if (redisPost) {
                let redisPost = JSON.parse(redisPost);
            }
        })
    }
    
}