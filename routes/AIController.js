// AIController.js
const eventEmitterManager = require('./EventEmitterManager');

class AIController {
    handleAIResponse(req, res) {
        const json = JSON.parse(req.body.result[0].choices[0].message.content);
        eventEmitterManager.emit('response', json);
        res.status(200).send('ok');
    }
}

module.exports = new AIController();