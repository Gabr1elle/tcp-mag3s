import { client } from '~/server/utils/vimeo';
const config = useRuntimeConfig();


export default defineEventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    let response = await new Promise((resolve, reject) => {
        client.request({
            path: `/videos/${id}`,
        },async function (error, body, status_code, headers) {
            if (error) {
                reject(error);
            } else {

                const videos = {
                    id: body.uri.split('/')[2],
                    name: body.name,
                    description: body.description,
                    duration: body.duration,
                    created_time: body.created_time,
                    modified_time: body.modified_time,
                    stats: body.stats,
                    tags: body.tags,
                    pictures: body.pictures,
                    links: {
                        uri: body.uri,
                        embed: body.player_embed_url,
                        link: body.link,
                    },
                }

                resolve({
                    statusCode: 200,
                    data: videos
                });

            }
        });
    });

    return response;
});
