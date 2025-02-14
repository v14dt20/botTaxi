// VKService.js

class VKService {
    constructor() {
        this.VK_API_URL = 'https://api.vk.com/method/messages.send';
    }

    async sendMessage(message, peerId, randomId) {
        const params = new URLSearchParams({
            peer_id: peerId,
            random_id: randomId,
            message: message,
            v: '5.199',
            access_token: process.env.VK_TOKEN,
        });

        const response = await fetch(`${this.VK_API_URL}?${params}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
}

module.exports = new VKService();