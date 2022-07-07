const request = require('request');
const fs = require('fs');
const moment = require('moment');

let api_key = 'YOUR_API_KEY';
let reklam_tipi = 1;
// 5 -> Film/Dizi
// 4 -> Spor/Futbol
// 3 -> Oyun/İndirme
// 2 -> Diğer
// 1 -> Yetişkin içerik +18

function log(msg) {
  console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg}`);
  fs.appendFileSync("./log.txt", `${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg} \n`);
}

log('Program başladı.')
log('Yapımcı: Can')
log('GitHub: https://github.com/fastuptime')

const links = fs.readFileSync('links.txt', 'utf8').split('\n');
for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let url = 'https://ay.live/api/?api=' + api_key + '&url=' + link + '&alias&ct=' + String(reklam_tipi); 
    request(url, function (e, res, body) {
        if (e) {
            console.log(e);
            log(link + ' url kısaltılamadı. Error: ' + e);
        } else {
            let data = JSON.parse(body);
            if (data.status == 'success') {
                log(link + ' başarılı bir şekilde kısaltıldı. Kısa link; ' + data.shortenedUrl);
                fs.appendFileSync("./shortened_links.txt", `${data.shortenedUrl}|${link}\n`);
            } else {
                log(link + ' url kısaltılamadı.')
            }
        }
    });
}