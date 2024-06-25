// import {client} from '~/server/utils/vimeo';
// const config = useRuntimeConfig();
// import { readBody } from 'h3';
// import { LikeVideoModel, CommentsVideoModel } from '~/server/models/Video.model';
// import { UserModel } from '~/server/models/User.model';
// import { UserMediaModel } from '~/server/models/UserMedia.model';
export default defineEventHandler(async (event) => {

    // const body = await readBody(event);
    // let response = await new Promise((resolve, reject) => {
    //     const clientId = config.clientId;
    //         client.request({
    //         path: `/me/videos`,
    //         query: {
    //             query: body.query,
    //             per_page: body.perPage ?? 6,
    //             page: body.page ?? 1
    //         }
    //     },async function (error, body, status_code, headers) {
    //         if (error) {
    //             reject(error);
    //         } else {
    //             try {
    //                 let videos = await Promise.all(body.data.map(async video => {
    //                     let countLikes = await LikeVideoModel.count({
    //                         where: {
    //                             video: video.uri.split('/')[2]
    //                         }
    //                     });
    //                     let allComments = await CommentsVideoModel.findAll({
    //                         where: {
    //                             video: video.uri.split('/')[2]
    //                         },
    //                         include: [{
    //                             model: UserModel,
    //                             as: 'user',
    //                             attributes: ['id', 'name', 'email', 'role']
    //                         }]
    //                     });
    //                     for (let comment of allComments) {
    //                         if (comment.user) {
    //                           const mediaModel = await UserMediaModel.findOne({
    //                             where: { userId: comment.user.id },
    //                             attributes: ['url']
    //                           });
    //                           if (mediaModel) {
    //                             comment.user.dataValues.profileURL = mediaModel.url;
    //                           }
    //                         }
    //                       }
    //                     return {
    //                         id: video.uri.split('/')[2],
    //                         name: video.name,
    //                         description: video.description,
    //                         duration: video.duration,
    //                         created_time: video.created_time,
    //                         modified_time: video.modified_time,
    //                         stats: video.stats,
    //                         tags: video.tags,
    //                         pictures: video.pictures,
    //                         links: {
    //                             uri: video.uri,
    //                             embed: video.player_embed_url,
    //                             link: video.link,
    //                         },
    //                         likes: countLikes,
    //                         comments: allComments
    //                     }
    //                 }));
    //                 resolve({
    //                     statusCode: 200,
    //                     data: videos
    //                 });
    //             } catch (e) {
    //                 resolve({
    //                     statusCode: 500,
    //                     body: e
    //                 });
    //             }
    //         }
    //     });
    // });

    // return response;
});
