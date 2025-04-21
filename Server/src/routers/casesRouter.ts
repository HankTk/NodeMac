import {Request, Response, Router} from 'express';
import CasesSevice from '../services/casesService';

/**
 * TestRouter
 *
 */
export default class CasesRouter {

    public router: Router;
    public socketio: any;

    /**
     * constructor
     *
     */
    constructor(pSocketio: any) {
        this.router = Router();
        this.socketio = pSocketio;
    }

    /**
     * routes
     * set up our routes
     */
    public routes() {

        // Services
        const casesServiceObj = new CasesSevice(this.socketio);

        this.router.get('/simulate/cases', function (req: any, res: any) {
            casesServiceObj.getAll(req, res);
        });

        this.router.get('/simulate/cases/:id', function (req: any, res: any) {
            casesServiceObj.getById(req, res);
        });

        this.router.put('/simulate/cases/:id', function (req: any, res: any) {
            casesServiceObj.updateById(req, res);
        });

        this.router.post('/simulate/cases', function (req: any, res: any) {
            casesServiceObj.create(req, res);
        });

        this.router.delete('/simulate/cases/:id', function (req: any, res: any) {
            casesServiceObj.deleteById(req, res);
        });

        this.router.delete('/simulate/cases', function (req: any, res: any) {
            casesServiceObj.deleteAll(req, res);
        });
    }

}
