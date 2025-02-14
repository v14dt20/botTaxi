// VKController.js
const deepSeekService = require('./DeepSeekService');
const vkService = require('./VKService');

class VKController {
    async handleConfirmation(req, res) {
        if (req.body.type === 'confirmation') {
            res.send('d34f4cb6');
        } else if (req.body.type === 'message_new') {
            const { text, from_id } = req.body.object.message;

            try {
                const data = await deepSeekService.requestDeepSeek(text);
                console.log(data);

                let messageAnswer;
                if (data.type === 'order') {
                    messageAnswer = `${data.text}\nАдрес подачи автомобиля: ${data.start}\nАдрес назначения: ${data.finish}\nВремя подачи автомобиля: ${data.time}\nКомментарий водителю: ${data.comment}`;
                } else {
                    messageAnswer = data.text;
                }

                await vkService.sendMessage(messageAnswer, from_id, 0);
                res.status(200).send('ok');
            } catch (error) {
                console.error('Error processing message:', error);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    }
}

module.exports = new VKController();