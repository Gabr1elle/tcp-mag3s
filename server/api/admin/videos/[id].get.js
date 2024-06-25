// import { client } from '~/server/utils/vimeo';
// import { LikeVideoModel, CommentsVideoModel } from '~/server/models/Video.model';
// const config = useRuntimeConfig();
// import { readBody } from 'h3';
// import { UserMediaModel } from '~/server/models/UserMedia.model';
// import { UserModel } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {

    // // const bodyRequest = await readBody(event);
    // const id = getRouterParam(event, 'id')

    // let response = await new Promise((resolve, reject) => {
    //     client.request({
    //         path: `/videos/${id}`,
    //     },async function (error, body, status_code, headers) {
    //         if (error) {
    //             reject(error);
    //         } else {
    //             let countLikes = await LikeVideoModel.count({
    //                 where: {
    //                     video: id
    //                 }
    //             });
    //             let allComments = await CommentsVideoModel.findAll({
    //                 where: {
    //                     video: id
    //                 },
    //                 include: [{
    //                     model: UserModel,
    //                     as: 'user',
    //                     attributes: ['id', 'name', 'email', 'role']
    //                 }]
    //             });

    //             for (let comment of allComments) {
    //                 if (comment.user) {
    //                   const mediaModel = await UserMediaModel.findOne({
    //                     where: { userId: comment.user.id },
    //                     attributes: ['url']
    //                   });
    //                   if (mediaModel) {
    //                     comment.user.dataValues.profileURL = mediaModel.url;
    //                   }
    //                 }
    //               }
    //             const videos = {
    //                 id: body.uri.split('/')[2],
    //                 name: body.name,
    //                 description: body.description,
    //                 duration: body.duration,
    //                 created_time: body.created_time,
    //                 modified_time: body.modified_time,
    //                 stats: body.stats,
    //                 tags: body.tags,
    //                 pictures: body.pictures,
    //                 links: {
    //                     uri: body.uri,
    //                     embed: body.player_embed_url,
    //                     link: body.link,
    //                 },
    //                 likes: countLikes,
    //                 comments: allComments
    //             }

    //             resolve({
    //                 statusCode: 200,
    //                 data: videos
    //             });

    //         }
    //     });
    // });
		const response = 'Hello World!'

    return response;
});
