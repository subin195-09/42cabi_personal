"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var index_1 = require("./routes/index");
app.use('/', index_1["default"]);
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
