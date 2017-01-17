var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "yprakoso";
var GITHUB_TOKEN = "1967e43320f5511a775ad855bdd1fedf114436fb";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }

  request(requestURL, cb);
}

getRepoContributors("jquery", "jquery", function(err, result, body) {
  var data = JSON.parse(body);
  var avatars = []
  data.forEach(function(element){
    avatars.push(element.avatar_url);
  });
  console.log(avatars);
});

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream('filename.jpg'));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")