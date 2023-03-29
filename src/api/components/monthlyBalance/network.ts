import { EPermissions } from '../../../constant/TABLES';
import { Router, NextFunction, Response, Request } from 'express';
import { success } from '../../../network/response';
const router = Router();
import Controller from './index';
import secure from '../../../auth/secure';

const getBankBalance = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.calculateBalance(1, req.query.toDate ? (new Date(String(req.query.toDate))) : undefined)
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        })
        .catch()
}

const getBookBalance = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.calculateBalance(2, req.query.toDate ? (new Date(String(req.query.toDate))) : undefined)
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        })
        .catch()
}

router
    .get("/bankBalance", secure(EPermissions.bankStatements), getBankBalance)
    .get("/bookBalance", secure(EPermissions.bookBank), getBookBalance)

export = router;