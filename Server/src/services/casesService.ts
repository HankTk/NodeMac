'use strict';

const fs = require('fs');
const  _ = require('lodash');
const  config = require('../../config/config.json');
const  uuid = require('uuid');

/**
 * TodoService
 *
 */
class CasesService {

    public socket: any;
    public modelName: string;

    /**
     * constructor
     *
     * @param socket
     */
    constructor(pSocket: any) {
        // Socket
        this.socket = pSocket;

        // Model Name
        this.modelName = 'cases';
    }

    /**
     * getAll
     *
     */
    public getAll(req: any, res: any) {
        console.log('service: getAll');
        // Get JSON Data
        var modelObject = this.getObject();

        // Filter Result
        var data = modelObject;

        // Respnse
        res.jsonp(data);
    }

    /**
     * getById
     *
     */
    getById(req: any, res: any) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Respnse
        res.jsonp(data);
    }

    /**
     * updateById
     *
     */
    updateById(req: any, res: any) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Update Data
        var reqData = req.body;
        this.updateData(data, reqData);

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('update', data);
    }

    /**
     * create
     *
     */
    create(req: any, res: any) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Filter Result
        var data = {};

        // Update Data
        const nextId = uuid();
        var reqData = req.body;
        reqData.id = nextId;
        this.updateData(data, reqData);

        // Add new object into modelObject
        modelObject.push(data);

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('create', data);
    }

    /**
     * deleteById
     *
     */
    deleteById(req: any, res: any) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Remove Object
        /* ES6
        modelObject = modelObject.filter(t => t.id !== id);
        */
        modelObject = modelObject.filter(function(element: any, index: any, array: any) {
            return (element.id !== id);
        });

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('delete', data);
    }

    /**
     * deleteAll
     *
     */
    deleteAll(req: any, res: any) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Remove All Object
        modelObject = [];

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(null);

        // Event Object
        this.emitEvent('deleteAll', []);
    }

    /**
     * updateData
     *
     * @param data
     * @param reqData
     */
    updateData(data: any, reqData: any) {
        for (var p in reqData) {
            data[p] = reqData[p];
        }
    }

    /**
     * getObject
     *
     */
    getObject() {
        // Get JSON Data
        var file = fs.readFileSync(config.databaseFile);
        var json = JSON.parse(file);
        return json[this.modelName];
    }

    /**
     * writeFile
     *
     */
    writeFile(modelObject: any) {
        // Get JSON Data
        var file = fs.readFileSync(config.databaseFile);
        var json = JSON.parse(file);
        json[this.modelName] = modelObject;
        fs.writeFileSync(config.databaseFile, JSON.stringify(json, null, '\t'));
    }

    /**
     * emitEvent
     *
     */
    emitEvent(action: any, data: any) {
        // Event Object
        var res_object = {
            "model": this.modelName,
            "action": action,
            "item": data
        };

        // emit event
        this.socket.emit('eventData', res_object);

        // emit event for Redis
        this.socket.emit('MessageeRedis', res_object);
    }

}

module.exports = CasesService;
