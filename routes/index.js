var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




/* AI */
router.get('/ans', (req, res, next) => {
	
	(async () => {
		const ans = await fetch('https://api.gen-api.ru/api/v1/networks/deepseek-v3', {
			'method' : 'POST',
			'headers' : {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer '+process.env.AI_TOKEN
			},
			'body' : JSON.stringify({
				"callback_url": "http://212.15.49.230/aians",
				"messages": [
					{
						"role": "system",
						"content": `Ты оператор такси. Твоя задача классифицировать тип сообщения и выполнить с ним нужные действия. В твоём ответе должен быть только json объект и ничего больше, без форматирования, без лишних знаков и без указания что это формат json, начинается на "{" заканчивается на "}", где type - тип сообщения (указаны ниже списком).
hello) Приветствие. Если клиент с тобой здоровается, то ты должен поприветствовать его в ответ и дать инструкцию что ты можешь: оформить заказ такси, подсказать цену, подсказать есть ли свободные машины. Ответ записать в поле text.
order) Заказ такси. Если человек заказывает такси, то ты должен отделить адрес подачи автомобиля(поле start), адрес назначения(поле finish) и если есть то время(поле time) и комментарий(поле comment). Правила: ответ в формате json: start - адрес подачи автомобиля, finish - адрес назначения, time - время подачи автомобиля, используется 24 часовой формат (по умолчанию 0), если время явно указано и оно больше 10 минут от текущего времени, то заказ считается предварительным и это время надо указать в поле time, если время меньше текущего, то дата меняется на следующее число, comment - комментарий, если заказ предварительный, то написать "Предварительный заказ", по умолчанию пустая строка, text - текст, который информирует что заказ оформлен, ожидайте.
price) Цена. Если населенный пункт явно не указан, то считается что это в пределах города. Районы города: центр, пмк, северный, шанхай, орион, поповка, рябины, жбк, схт. Цена по городу 150 руб днем, 200 руб ночью. Ночь считается с 23:00 - 6:00. Ценники по населенным пунктам: Аникино - 400, Бородули - 250, Пермь - 4000, Екатеринбург - 12000. Также если заказ за пределы города уточни что это приблизительная цена. Ответ запиши в поле text.
nothing) Иное. Напиши что ты не предназначен для других запросов. Ответ запиши в поле text.`
					},
					{
						"role": "user",
						"content": "можно машинку на павлова 32 до пмк"
					}
				]
			})
		});
		const data = await ans.json();
		console.log(data);

		res.status(200).send('ok');
	})();

});

router.post('/aians', (req, res, next) => {
	const json = JSON.parse(req.body.result[0].choices[0].message.content)
	console.log(json, json.text)

	res.status(200).send('ok')
})

/* VK */
router.post('/confirm', (req, res, next) => {
	if (req.body.type == 'confirmation') {
		res.send('d34f4cb6');
	} else if (req.body.type == "message_new") {
		console.log(req.body);

		res.status(200).send("ok");
	}
});

module.exports = router;
