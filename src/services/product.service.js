import project from '../../db/models/product.dao';
import user  from '../../db/models/admin_user.dao';
import AppError from '../utils/appError';

class ProjectService {
    async createProject(projectData, userId) {
        const newProject = await project.create({
            ...projectData,
            createdBy: userId,
        });

        return newProject;
    }

    async getAllProjectsByUser(userId) {
        const projects = await project.findAll({
            include: user,
            where: { createdBy: userId },
        });

        return projects;
    }

    async getProjectById(projectId) {
        const projectData = await project.findByPk(projectId, { 
            include: user 
        });

        if (!projectData) {
            throw new AppError('Invalid project id', 400);
        }

        return projectData;
    }

    async updateProject(projectId, userId, updateData) {
        const projectData = await project.findOne({
            where: { 
                id: projectId, 
                createdBy: userId 
            },
        });

        if (!projectData) {
            throw new AppError('Invalid project id', 400);
        }

        // Update fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                projectData[key] = updateData[key];
            }
        });

        const updatedProject = await projectData.save();

        return updatedProject;
    }

    async deleteProject(projectId, userId) {
        const projectData = await project.findOne({
            where: { 
                id: projectId, 
                createdBy: userId 
            },
        });

        if (!projectData) {
            throw new AppError('Invalid project id', 400);
        }

        await projectData.destroy();

        return { message: 'Record deleted successfully' };
    }
}

export default new ProjectService();