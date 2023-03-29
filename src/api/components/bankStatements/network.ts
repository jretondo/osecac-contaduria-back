import { EPermissions } from '../../../constant/TABLES';
import { Router, NextFunction, Response, Request } from 'express';
import { success } from '../../../network/response';
const router = Router();
import Controller from './index';
import secure from '../../../auth/secure';

const getBalance = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.calculateBalance(
        req.query.toDate ?
            (new Date(String(req.query.toDate))) :
            undefined)
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        }).catch(next)
}

const insertBulkMovements = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.insertBulkMovements(
        req.body.dataArray,
        req.body.dataColumns,
        req.body.user)
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        }).catch(next)
}

const getMovements = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.movements(Boolean(req.query.wo_type))
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        }).catch(next)
}

const getTypes = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.movementsType()
        .then((data) => {
            success({
                req,
                res,
                message: data,
                status: 200
            });
        }).catch(next)
}

router
    .get("/balance", secure(EPermissions.bankStatements), getBalance)
    .post("/movements", secure(EPermissions.bankStatements), insertBulkMovements)
    .get("/movements", secure(EPermissions.bankStatements), getMovements)
    .get("/types", secure(EPermissions.bankStatements), getTypes)

export = router;