import { Op } from 'sequelize';
import { IActivity } from '../../../interfaces/Tables';
import { IUser } from 'interfaces/Tables';
import Activity from '../../../models/Activity';
import Admin from '../../../models/Admin';
import AdminPermission from '../../../models/AdminPermission';
import AuthAdmin from '../../../models/AuthAdmin';
import BalanceTypes from '../../../models/BalanceType';
import BankStatement from '../../../models/BankStatements';
import Beneficiary from '../../../models/Beneficiary';
import BookBank from '../../../models/BookBank';
import Dossier from '../../../models/Dossier';
import DossierDetail from '../../../models/DossierDetail';
import DossierPayment from '../../../models/DossierPayment';
import DossierState from '../../../models/DossierState';
import MonthlyBalance from '../../../models/MonthlyBalance';
import MovementType from '../../../models/MovementType';
import Permission from '../../../models/Permission';
import Provider from '../../../models/Provider';
import ProviderType from '../../../models/ProviderType';
import ReceiptType from '../../../models/ReceiptType';
import StockDocument from '../../../models/StockDocument';
import StockType from '../../../models/StockType';
import Preferences from '../../../models/Preferences';
import { Columns } from '../../../constant/TABLES';

export = () => {
    const upsert = async (user: IUser, activity_description: string) => {
        const newActivity: IActivity = {
            user_id: user.id || 0,
            activity_description: activity_description
        }
        const response = await Activity.create(newActivity)
        return response
    }

    const createAll = async () => {
        const algo = {
            activity: await Activity.findAll(),
            admin: await Admin.findAll(),
            adminPerm: await AdminPermission.findAll(),
            authAdmin: await AuthAdmin.findAll(),
            balanceType: await BalanceTypes.findAll(),
            bankStatement: await BankStatement.findAll(),
            beneficiary: await Beneficiary.findAll(),
            bookBank: await BookBank.findAll(),
            dossier: await Dossier.findAll(),
            dossierDetail: await DossierDetail.findAll(),
            DossierPayment: await DossierPayment.findAll(),
            DossierState: await DossierState.findAll(),
            MonthlyBalance: await MonthlyBalance.findAll(),
            MovementType: await MovementType.findAll(),
            permission: await Permission.findAll(),
            provider: await Provider.findAll(),
            provType: await ProviderType.findAll(),
            receiptType: await ReceiptType.findAll(),
            stockDocuments: await StockDocument.findAll(),
            stockType: await StockType.findAll(),
            preferences: await Preferences.findAll()
        }
    }

    const list = async (page: number, userId?: number, dateFrom?: string, dateTo?: string) => {
        const fromDate = new Date(dateFrom || "")
        const toDate = new Date(dateTo || "")
        toDate.setDate(toDate.getDate() + 1)
        toDate.setMilliseconds(-1)

        const ITEMS_PER_PAGE = 2;

        const dateFromFilter = dateFrom ? { [Op.gte]: fromDate } : {};
        const dateToFilter = dateTo ? { [Op.lte]: toDate } : {};

        const filter = userId ? {
            user_id: userId,
            date: { [Op.and]: [dateFromFilter, dateToFilter] }
        } : {
            date: { [Op.and]: [dateFromFilter, dateToFilter] }
        };

        const offset = ((page || 1) - 1) * (ITEMS_PER_PAGE);
        const { count, rows } = await Activity.findAndCountAll({
            where: filter,
            include: Admin,
            offset: offset,
            limit: ITEMS_PER_PAGE,
            order: [
                [Columns.activity.id, "DESC"]
            ]
        });
        return {
            items: rows,
            pagesQuantity: Math.ceil(Number(count) / Number(ITEMS_PER_PAGE)),
        }
    }

    return {
        upsert,
        list,
        createAll
    };
}