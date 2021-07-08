const fs = require('fs-extra');
const path = require('path');
let walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {

    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

if(!fs.existsSync("logs")){
	fs.mkdirSync('logs');
	console.log('Я не нашёл папку "logs," поэтому я её создал за тебя.\nТебе только осталось закинуть логи в папку "logs" и запустить скрипт по новой.');
	return
}
if(!fs.existsSync("result")){
	fs.mkdirSync('result');
}
console.log('Собираю пути, не завершайте скрипт пока он сам этого не захочет.\nДа, теперь не вы будете хотеть, а скрипт :3');


walk('./logs', function(err, results) {
  if (err) throw err;
  console.log(results)
  for ( strPath of results) {
	  try{
	  if( strPath.endsWith('Passwords.txt')){
  let data = fs.readFileSync(strPath);
let password2 = [...(data.toString()
				.matchAll(/URL: ((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\r\nUsername: (([^\n]*))\r\nPassword: (([^\n]*))/g))]
					.map(m => m.slice(1)); 
					password2.forEach(x => {
						if(x[1].split('//')[0] == "android:") return;
						console.log(`${x[1]}\n${x[4]}:${x[6]}`)
						fs.appendFileSync(`./result/${x[1].split('//')[1]}.txt`,  x[4] + ":" + x[6] + "\n");
						fs.appendFileSync('allLogPass.txt',  x[4] + ":" + x[6] + "\n");
					});

 }
	  } catch(err) {
		  console.log(err)
	  }
  }
});