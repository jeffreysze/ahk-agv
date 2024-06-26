var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helpers = require('./components/hbsHelpers');

var indexRouter = require('./routes/index');
var mapRouter = require('./routes/map');
var navigationRouter = require('./routes/navigation');
var timetableRouter = require('./routes/timetable');
var managementRouter = require('./routes/management');

//const bootstrap = require('bootstrap')

var app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {});
for (let helper in helpers) {
  hbs.registerHelper(helper, helpers[helper]);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/', indexRouter);
app.use('/map', mapRouter);
app.use('/navigation', navigationRouter);
app.use('/timetable', timetableRouter);
app.use('/management', managementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
