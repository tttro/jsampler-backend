
import * as typeModel from '../models/type-model';


let getType = function(req, res){

  if (req.params.id) {
    var project = {'id': req.params.id};
  }

  else {
    const err = new Error('Project not found: ' + req.params.id);
    err.status = 404;
    throw err;
  }

  return res.json(project);

};

let getAllTypes = function (req, res ) {

  var types = typeModel.getAll();

  return res.json(types);
};

let postType = function (req, res) {
  //typeModel.createOrUpdate();
  console.log(req.body);
  //return res.json(typeModel.createOrUpdate());
  return res.json('foo');
};

export {
  getType,
  getAllTypes,
  postType
};
