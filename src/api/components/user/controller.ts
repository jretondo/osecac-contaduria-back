import { IListResponse } from './../../../interfaces/Others';
import { Op } from 'sequelize';
import { IAuth, IUser } from 'interfaces/Tables';;
import AuthController from '../auth/index';
import Admin from '../../../models/Admin';
import BankStatement from '../../../models/BankStatements';


export = () => {
    const list = async (page?: number, item?: string, itemsPerPage?: number): Promise<IListResponse> => {
        if (page) {
            const ITEMS_PER_PAGE = itemsPerPage || 10;
            const offset = ((page || 1) - 1) * (itemsPerPage || 10)
            const { count, rows } = await Admin.findAndCountAll({
                where: {
                    [Op.and]: item ? {
                        [Op.or]: [
                            { lastname: { [Op.substring]: item } },
                            { email: { [Op.substring]: item } },
                            { name: { [Op.substring]: item } },
                            { user: { [Op.substring]: item } },
                            { phone: { [Op.substring]: item } }
                        ]
                    } : {},
                    admin: false
                },
                offset: offset,
                limit: itemsPerPage || 10
            })
            return {
                pagesQuantity: Math.ceil(Number(count) / Number(ITEMS_PER_PAGE)),
                items: rows
            }
        } else {
            const rows = await Admin.findAll({
                where: {
                    [Op.and]: item ? {
                        [Op.or]: [
                            { lastname: { [Op.substring]: item } },
                            { email: { [Op.substring]: item } },
                            { name: { [Op.substring]: item } },
                            { user: { [Op.substring]: item } },
                            { phone: { [Op.substring]: item } }
                        ]
                    } : {},
                    admin: false
                }
            })
            return {
                pagesQuantity: 0,
                items: rows
            }
        }
    }

    const upsert = async (body: IUser) => {
        const user: IUser = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            user: body.userName || "",
            phone: body.phone,
            admin: false
        }
        if (body.id) {
            return await Admin.update(user, { where: { id: body.id } });
        } else {
            const result = await Admin.create(user)

            const newAuth: IAuth = {
                id: result.dataValues.id,
                user: user.user,
                prov: 1,
                admin_id: result.dataValues.id || 0
            }
            return await AuthController.upsert(newAuth, body.email, `${body.name} ${body.lastname}`);
        }
    }

    const remove = async (idUser: number) => {
        return await Admin.destroy({ where: { id: idUser } })
    }

    const getUser = async (idUser: number) => {
        const data = await BankStatement.findAll()
        return await Admin.findByPk(idUser)
    }

    return {
        list,
        upsert,
        remove,
        getUser
    }
}
