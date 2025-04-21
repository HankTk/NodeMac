"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var casesService_1 = __importDefault(require("../services/casesService"));
/**
 * TestRouter
 *
 */
var CasesRouter = /** @class */ (function () {
    /**
     * constructor
     *
     */
    function CasesRouter(socketio) {
        this.router = express_1.Router();
        this.socketio = socketio;
    }
    /**
     * routes
     * set up our routes
     */
    CasesRouter.prototype.routes = function () {
        // Services
        var casesServiceObj = new casesService_1.default(this.socketio);
        this.router.get('/simulate/cases', function (req, res) {
            casesServiceObj.getAll(req, res);
        });
        this.router.get('/simulate/cases/:id', function (req, res) {
            casesServiceObj.getById(req, res);
        });
        this.router.put('/simulate/cases/:id', function (req, res) {
            casesServiceObj.updateById(req, res);
        });
        this.router.post('/simulate/cases', function (req, res) {
            casesServiceObj.create(req, res);
        });
        this.router.delete('/simulate/cases/:id', function (req, res) {
            casesServiceObj.deleteById(req, res);
        });
        this.router.delete('/simulate/cases', function (req, res) {
            casesServiceObj.deleteAll(req, res);
        });
    };
    return CasesRouter;
}());
exports.default = CasesRouter;
