import business from '../../db/models/product.dao';
import user  from '../../db/models/admin_user.dao';
import AppError from '../utils/appError';

class BusinessService {
    async createBusiness(businessData, userId) {
        const newBusiness = await business.create({
            ...businessData,
            createdBy: userId,
        });

        return newBusiness;
    }

    async getAllBusinesssByUser(userId) {
        const businesses = await business.findAll({
            include: user,
            where: { createdBy: userId },
        });

        return businesses;
    }

    async getBusinessById(businessId) {
        const businessData = await business.findByPk(businessId, { 
            include: user 
        });

        if (!businessData) {
            throw new AppError('Invalid business id', 400);
        }

        return businessData;
    }

    async updateBusiness(businessId, userId, updateData) {
        const businessData = await business.findOne({
            where: { 
                id: businessId, 
                createdBy: userId 
            },
        });

        if (!businessData) {
            throw new AppError('Invalid business id', 400);
        }

        // Update fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                businessData[key] = updateData[key];
            }
        });

        const updatedBusiness = await businessData.save();

        return updatedBusiness;
    }

    async deleteBusiness(businessId, userId) {
        const businessData = await business.findOne({
            where: { 
                id: businessId, 
                createdBy: userId 
            },
        });

        if (!businessData) {
            throw new AppError('Invalid business id', 400);
        }

        await businessData.destroy();

        return { message: 'Record deleted successfully' };
    }
}

export default new BusinessService();