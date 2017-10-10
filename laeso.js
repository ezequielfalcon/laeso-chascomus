const express = require('express');
const app = express();
const forceSSL = function() {
    return function(req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
};
app.use(forceSSL());
app.use(express.static(__dirname + '/dist'));
app.get('/backend', (req, res) => {
  res.json({url: process.env.BACKEND_URL})
});
app.listen(process.env.PORT || 5000, function() {
    console.log("Frontend iniciado!");
});
