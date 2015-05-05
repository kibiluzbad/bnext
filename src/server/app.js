/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });

        app.post('/oauth/token', oauthTokenPost);
        app.get('/me', getMe);
        app.get('/projects', getProjects);
        app.get('/projects/:projectId/builds', getBuilds);
        app.get('/builds', getBuilds);

        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});

function oauthTokenPost(req,res){
    var token = {token:'token','refresh_token':'refresh_token'}

    return res.json(token);
}

function getMe(req,res){
    if(!req.headers.authorization) return res.status(403).json({message:'Access denied'});
    var user = {
        name:'Test User',
        email: 'test.user@domain.com',
        roles:['User'],
        avatarUri:'/images/user2-160x160.jpg',
        title: 'Application User',
        createdAt: new Date(2015,1,1)
    };

    res.json(user);
}

function getProjects(req,res){
    return res.json([{id:'rewr-rewrwe-rwer-rwer',name:'gingaeureka/eureka-api'}]);
}

function getBuilds(req,res){
    var builds = [
        {id:'36a229a1', name:'gingaeureka/eureka-api',message:'Change socket', createAt: new Date(2015,30,4,4,34), branch: 'qa', timeSpent: 1, status: 'Success', username:'leonardoginga', repoProvider:'Bitbucket'},
        {id:'68f96bd2', name:'gingaeureka/eureka-api',message:'Responsavel configuracoes ', createAt: new Date(2015,30,4,3,34), branch: 'qa', timeSpent: 1, status: 'Failed',username:'leonardoginga', repoProvider:'Bitbucket'},
        {id:'e345b95c', name:'gingaeureka/eureka-api',message:'Checkpoit boletim ', createAt: new Date(2015,30,4,1,34), branch: 'qa', timeSpent: 1, status: 'Success',username:'leonardoginga', repoProvider:'Bitbucket'}
    ];

    return res.json(builds);
}
