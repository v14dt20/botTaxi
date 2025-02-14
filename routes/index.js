// routes.js
const express = require('express');
const router = express.Router();
const aiController = require('./AIController');
const vkController = require('./VKController');

// Рендер главной страницы
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Маршрут для обработки ответа от DeepSeek
router.post('/aians', aiController.handleAIResponse);

// Маршрут для обработки запросов от VK
router.post('/confirm', vkController.handleConfirmation);

module.exports = router;