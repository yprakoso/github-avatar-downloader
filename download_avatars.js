var request = require('request');
var fs = require('fs');

var myArgs = process.argv.slice(2);
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

getRepoContributors(myArgs[0], myArgs[1], function(err, result, body) {
  var data = JSON.parse(body);
  var avatars = []
  data.forEach(function(element){
    // console.log(element);
    downloadImageByURL(element.avatar_url, element.login);
  });
  // console.log(avatars);
});

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}
