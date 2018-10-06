import schedule from 'node-schedule';
import articleModel from '../models/article/index.js';
import config from '../config/index.js'
import redis from './redis.js'
import miment from 'miment';

export const artilceInfo = {
    getDraftPostFromMysql: async (id) => {
        try {
            let selectResult = await articleModel.find({
                where: {
                    art_id: id
                }
            });
            console.log(selectResult);
            if (selectResult) {
                return { selectResult }
            } else {
                return {};
            }
        } catch (error) {
            console.log(error)
        }
    },
    redisToMysqlTask: async () => {
        const draftRedis = new redis(config.redis);
        let rule = new schedule.RecurrenceRule();
        rule.hour = 23;
        rule.minute = 11;

        schedule.scheduleJob(rule, async () => {
            console.log('现在的时间' + 'haha');
            let redisPost = await draftRedis.get(config.draftPostRedisKey);
            if (redisPost) {
                // let redisPost = JSON.parse(redisPost);
                try {
                    const { title, content, tags, status = 0, sticky = 0} = redisPost;
                    let response = await articleModel.create({
                        art_title: title,
                        art_status: status,
                        art_sticky: sticky,
                        art_detai: content,
                        art_create_time: miment().format(),
                        art_update_time: miment().format(),
                        art_tag: tags.join()
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    
}