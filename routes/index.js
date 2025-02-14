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
						"role": "user",
						"content": "Привет. Тест 1"
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
	console.log(req.body)
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
