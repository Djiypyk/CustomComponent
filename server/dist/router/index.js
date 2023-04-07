"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controlles/user-controller"));
const Router = require('express').Router;
const router = new Router();
router.post('/registartion', user_controller_1.default.registarion);
router.post('/login', user_controller_1.default.login);
router.post('/logout', user_controller_1.default.logout);
router.get('/activate/:link', user_controller_1.default.activate);
router.get('/refresh', user_controller_1.default.refresh);
router.get('/users', user_controller_1.default.getUser);
exports.default = router;
