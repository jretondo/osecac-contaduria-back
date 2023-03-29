import { IListResponse } from '../../../interfaces/Others';
import { Op } from 'sequelize';
import { IAuth, IUser } from 'interfaces/Tables';;
import AuthController from '../auth/index';
import Admin from '../../../models/Admin';
import BankStatement from '../../../models/BankStatements';
import MonthlyBalance from '../../../models/MonthlyBalance';
import { Columns } from '../../../constant/TABLES';


export = () => {
    const calculateBalance = async (type: number, toDate?: Date) => {
        let lastDate = new Date()
        if (toDate) {
            lastDate = toDate
        }

        const LAST_MONTH = (lastDate.getMonth() + 1)
        const LAST_YEAR = lastDate.getFullYear()

        return await MonthlyBalance.findOne(
            {
                order: [
                    [Columns.monthlyBalance.year, 'DESC'],
                    [Columns.monthlyBalance.montH, 'DESC']
                ],
                where: {
                    year: { [Op.lte]: LAST_YEAR },
                    month: { [Op.lte]: LAST_MONTH },
                    type_id: type
                }
            })
    }

    return {
        calculateBalance
    }
}
