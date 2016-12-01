import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function noCache(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // TODO pois
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});

app.set('json spaces', 2); // Pretty print

let port = process.env.PORT || 8080;


// Initialize routes
const router = routes();
app.use('/api', router);

app.get('/',function(req,res){

  res.sendFile(__dirname + '/test/index.html');

});

app.use('/upload', express.static(__dirname + '/data'));

app.listen(port, ()=> {
    console.log('Server is listening: ' + port);
});
