import * as soundModel from '../models/sound-model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, crypto.createHash('md5').update(file.originalname).digest("hex"));
  }
});

let soundFileFilter = function (req, file, cb) {

  var hashedName = crypto.createHash('md5').update(file.originalname).digest("hex");

  fs.stat('./uploads/' + hashedName, function(err, stat) {
    if(err == null) {
      req.fileValidationError = 'file exist';
      return cb(null, false);
    }
  });

  if (file.mimetype !== 'audio/mp3') {
    req.fileValidationError = 'goes wrong on the mimetype';
    return cb(null, false);
  }
  cb(null, true);
};

const maxSize = 5 * 10000;

let upload =  multer({
  storage : storage,
  dest: path.join(__dirname, '../uploads'),
  limits: {fileSize:maxSize},
  fileFilter: soundFileFilter,
  }).array('sound', 8);



let getSound = function(req, res){

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

let getAllSounds = function (req, res ) {

  var sounds = soundModel.getAll();

  return res.json(sounds);
};



let postSound = function (req, res) {

  upload(req,res,function(err) {
    console.log('foo');
    if (req.fileValidationError) {
      console.log(req.fileValidationError);
      return;
    }

    soundModel.createOrUpdate(req.files);

  console.log('done');

  });




//audio/mpeg audio/wav

  return res.json('');
};

export {
  getSound,
  getAllSounds,
  postSound
};
