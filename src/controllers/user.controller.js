import { Sequelize } from 'sequelize';
import adminUser from '../../db/models/admin_user.dao';
import catchAsync from '../utils/catchAsync';

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await adminUser.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

export default { getAllUsers };
