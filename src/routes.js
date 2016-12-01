import express from 'express';
import * as httpProject from './routes/projects-http';
import * as httpSounds from './routes/sounds-http';
import * as httpTypes from './routes/types-http';



function initRouter() {
    const router = express.Router();

    // Project end point
    router.get('/projects/:id', httpProject.getProject);
    router.get('/projects', httpProject.getAllProjects);
    router.delete('/projects/:id', httpProject.deleteProject);
    router.post('/project');

    // Sounds
    router.get('/sounds', httpSounds.getAllSounds);
    router.post('/sounds', httpSounds.postSound);

    // Types
    router.get('/types', httpTypes.getAllTypes);
    router.post('/types', httpTypes.postType);

    return router;
}

export default initRouter;
