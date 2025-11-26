import businessService from '../services/business.service';
import catchAsync from '../utils/catchAsync';

const createBusiness = catchAsync(async (req, res, next) => {
    const { body, user } = req;
    
    const businessData = {
        title: body.title,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
    };

    const newBusiness = await businessService.createBusiness(businessData, user.id);

    return res.status(201).json({
        status: 'success',
        data: newBusiness,
    });
});

const getAllBusiness = catchAsync(async (req, res, next) => {
    const businesss = await businessService.getAllBusinesssByUser(req.user.id);

    return res.json({
        status: 'success',
        data: businesss,
    });
});

const getBusinessById = catchAsync(async (req, res, next) => {
    const business = await businessService.getBusinessById(req.params.id);

    return res.json({
        status: 'success',
        data: business,
    });
});

const updateBusiness = catchAsync(async (req, res, next) => {
    const { body, user, params } = req;
    
    const updateData = {
        title: body.title,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
    };

    const updatedBusiness = await businessService.updateBusiness(
        params.id,
        user.id,
        updateData
    );

    return res.json({
        status: 'success',
        data: updatedBusiness,
    });
});

const deleteBusiness = catchAsync(async (req, res, next) => {
    const result = await businessService.deleteBusiness(
        req.params.id,
        req.user.id
    );

    return res.json({
        status: 'success',
        ...result,
    });
});

export default {
    createBusiness,
    getAllBusiness,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
};