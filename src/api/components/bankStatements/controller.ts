import { Tables } from './../../../constant/TABLES';
import { IBankStatements, IUser } from './../../../interfaces/Tables';
import { IColumnsMovementsInsert } from './../../../interfaces/Others';
import { getLastDateMonth } from './../../../utils/functions/getLastDateMonth';
import { Op, Sequelize } from 'sequelize';
import BankStatement from '../../../models/BankStatements';
import { Columns } from '../../../constant/TABLES';
import monthlyBalanceController from '../monthlyBalance';
import sequelize from '../../../database';
import MovementType from '../../../models/MovementType';

export = () => {
    const calculateBalance = async (toDate?: Date) => {

        const monthlyBalance = await monthlyBalanceController.calculateBalance(1, toDate)
        const lastMonth = monthlyBalance?.dataValues.month || 1
        const lastYear = monthlyBalance?.dataValues.year || new Date().getFullYear()
        const lastBalance = monthlyBalance?.dataValues.balance || 0
        const fromDate = getLastDateMonth(lastMonth || 1, lastYear || new Date().getFullYear())

        const bankAmounts = await BankStatement.findOne({
            attributes: {
                include: [
                    [sequelize.fn('SUM', sequelize.col(Columns.bankStatements.amount)), 'sum_amounts'],
                    [sequelize.fn("MAX", sequelize.col(Columns.bankStatements.date)), 'last_date']
                ]
            },
            where: {
                date: toDate ?
                    { [Op.gte]: fromDate, [Op.lte]: toDate } :
                    { [Op.gte]: fromDate }
            }
        })
        const balance = bankAmounts?.dataValues.sum_amounts
        const dateBalance = bankAmounts?.dataValues.last_date
        const alternativeDate = new Date(lastYear, lastMonth, 1)
        alternativeDate.setDate(alternativeDate.getDate() - 1)
        return {
            lastBalance: balance ? balance + lastBalance : lastBalance,
            lastDate: (dateBalance ? dateBalance : (alternativeDate))
        }
    }

    const insertBulkMovements = async (dataArray: Array<Array<any>>, dataColumns: IColumnsMovementsInsert, user: IUser) => {
        const movementsBulkArray: Array<IBankStatements> = dataArray.map((item) => {
            return ({
                date: item[dataColumns.dateColumn],
                receipt_number: item[dataColumns.receiptNumberColumn],
                description: item[dataColumns.descriptionColumn],
                concept: item[dataColumns.conceptColumn],
                observations: "",
                amount: item[dataColumns.amountColumn],
                closed: false,
                reconciled: false,
                movement_type_id: sequelize.literal(`(SELECT ${Tables.MOVEMENTS_TYPE}.${Columns.movementsType.order} as Ord FROM ${Tables.MOVEMENTS_TYPE} WHERE ${Tables.MOVEMENTS_TYPE}.${Columns.movementsType.description} LIKE '%${item[dataColumns.conceptColumn].slice(0, 13)}%' LIMIT 1)`),
                book_id: undefined,
                user_id: user.id,
            })
        })
        await BankStatement.bulkCreate(movementsBulkArray)
        return await movementsWithoutType()
    }

    const movementsWithoutType = async () => {
        return await BankStatement.findAll({ where: { movement_type_id: null } })
    }

    const movements = async (wo_type?: boolean) => {
        if (wo_type) {
            return await movementsWithoutType()
        }
    }

    const movementsType = async () => {
        return await MovementType.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col(Columns.movementsType.order)), Columns.movementsType.order], Columns.movementsType.name], order: [Columns.movementsType.order] })
    }

    return {
        calculateBalance,
        insertBulkMovements,
        movements,
        movementsType
    }
}
