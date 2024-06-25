import { Vimeo } from 'vimeo';
const config = useRuntimeConfig();

const clientId = config.clientId;
const clientSecret = config.clientSecret;
const accessToken = config.accessToken;
export const client = new Vimeo(clientId, clientSecret, accessToken);
