"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("path"));
var express = require('express');
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'game', 'pong.html'));
});
app.use("/js", express.static('game/js/'));
http.listen(3000, () => {
    console.info('HTTP server started on port 3000');
});


