#!/Users/webber/.nvm/versions/node/v8.9.4/bin/node

const args = process.argv.splice(2);
const exec = require('child_process').exec;

exec(`cat ${args[0]}/service/app.js | grep '[es]t('`, (err, output) => {
	if (err) console.error(err);
	let urlRegex = /\.[gp](.*)\/(.*)?\'/g;
	let urlResult = output.match(urlRegex)
	urlResult.forEach((urlText) => {
		urlText = urlText.replace('\(\'', ' ').replace(/\./, '').replace(/\'.*/, '');
		console.log(urlText);
	});
})
