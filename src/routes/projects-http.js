import * as projectModel from '../models/project-model';
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/gif', 'image/png']);

let getProject = function(req, res){

   /* if (req.params.id) {
        var project = {'id': req.params.id};
    }

    else {
        const err = new Error('Project not found: ' + req.params.id);
        err.status = 404;
        throw err;
    }*/

    return res.json(projectModel.getById(req.params.id));

};

let getAllProjects = function (req, res ) {

  var projects = projectModel.getAll();

  return res.json(projects);
};

let deleteProject = function (req, res ) {


};

let putProject = function (req, res ) {

};

function uploadSoundFile(soundFileName, soundFile) {
  return Promise.resolve().then(() => validateMimeType())
};

function validateMimeType(mimetype) {
  if (ALLOWED_MIME_TYPES.has(mimetype)) {
    return Promise.resolve();
  } else {
    throw new Error(`Unsupported file type ${ mimetype } uploaded`);
  }
};


export {
  getProject,
  getAllProjects,
  deleteProject,
  putProject

};
