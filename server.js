const express = require('express');
const path = require('path');

const app = express();

const options = {
  setHeaders: (res, path, stat) => {
    res.set(
      'Content-Security-Policy',
      "default-src 'self' http://angular-gitlab-heroku.herokuapp.com/; script-src 'self' http://angular-gitlab-heroku.herokuapp.com/; connect-src http://angular-gitlab-heroku.herokuapp.com/ 'self'; img-src 'self' www.google.com; style-src 'self' 'unsafe-inline';"
    )
  }
}


app.use(express.static(__dirname + '/dist'), options);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



app.listen(process.env.PORT || 4200);