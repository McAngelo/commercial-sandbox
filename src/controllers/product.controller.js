import projectService from '../services/product.service';
import catchAsync from '../utils/catchAsync';

const createProject = catchAsync(async (req, res, next) => {
    const { body, user } = req;
    
    const projectData = {
        title: body.title,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
    };

    const newProject = await projectService.createProject(projectData, user.id);

    return res.status(201).json({
        status: 'success',
        data: newProject,
    });
});

const getAllProject = catchAsync(async (req, res, next) => {
    const projects = await projectService.getAllProjectsByUser(req.user.id);

    return res.json({
        status: 'success',
        data: projects,
    });
});

const getProjectById = catchAsync(async (req, res, next) => {
    const project = await projectService.getProjectById(req.params.id);

    return res.json({
        status: 'success',
        data: project,
    });
});

const updateProject = catchAsync(async (req, res, next) => {
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

    const updatedProject = await projectService.updateProject(
        params.id,
        user.id,
        updateData
    );

    return res.json({
        status: 'success',
        data: updatedProject,
    });
});

const deleteProject = catchAsync(async (req, res, next) => {
    const result = await projectService.deleteProject(
        req.params.id,
        req.user.id
    );

    return res.json({
        status: 'success',
        ...result,
    });
});

export default {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
};