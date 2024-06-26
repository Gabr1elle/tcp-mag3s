import {client} from '~/server/utils/vimeo';

const config = useRuntimeConfig();
import { readBody } from 'h3';
export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    let response = await new Promise((resolve, reject) => {
        const clientId = config.clientId;
        let perPageVar, pageVar;
        if (body.page && body.perPage) {
            pageVar = body.page;
            perPageVar = body.perPage;
        }
        const query = {
            page: pageVar ?? 1,
            "per_page": perPageVar ?? 7
        }
        client.request({
            path: `/users/${clientId}/projects/${body.folderId}/items`,
            query: query
        },async function (error, body, status_code, headers) {

            if (error) {
                reject(error);
            } else {
                try {
                    let videos = await Promise.all(body.data.map(async video => {
                        return {
                            id: video.video.uri.split('/')[2],
                            name: video.video.name,
                            description: video.video.description,
                            duration: video.video.duration,
                            created_time: video.video.created_time,
                            modified_time: video.video.modified_time,
                            stats: video.video.stats,
                            tags: video.video.tags,
                            pictures: video.video.pictures,
                            links: {
                                uri: video.video.uri,
                                embed: video.video.player_embed_url,
                                link: video.video.link,
                            },

                        }
                    }));
                    resolve({
                        statusCode: 200,
                        data: videos
                    });
                } catch (e) {
                    resolve({
                        statusCode: 500,
                        body: e
                    });
                }
            }
        });
    });

    return response;
});
