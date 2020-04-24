"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Middleware to prottect route
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403).send('Not permitted.');
    }
};
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <h1>You are logged in</h1>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <h1>You are not log in</h1>\n        <a href=\"/login\">Please log in</a>\n      </div>\n    ");
    }
});
router.get('/login', function (req, res) {
    res.send("\n    <div>\n      <h1>Please Login</h1>\n      <form action=\"\" method=\"POST\">\n        <div>\n          <label for=\"email\">Email</label>\n          <input name=\"email\" type=\"email\" />\n        </div>\n        <div>\n          <label for=\"email\">Password</label>\n          <input name=\"password\" type=\"password\" />\n        </div>\n        <button>Submit</button>\n      </form>\n    </div>\n    ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'test@test.com' && password === '1234') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route');
});
