import {client} from '~/server/utils/vimeo';

const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
    const clientId = config.clientId;

    let response = await new Promise((resolve, reject) => {
        client.request({
            path: `/users/${clientId}/folders`,
        }, function (error, body, status_code, headers) {
            if (error) {
                reject(error);
            } else {
                try {
					let folderId = body.data.find(folder => folder.name === 'Publico').uri.split('/users/')[1].split('/projects/');
                    resolve({
                        statusCode: 200,
                        folderId: folderId[1]
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
