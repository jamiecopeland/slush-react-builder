'use strict';

// --------------------------------------------------
// Library imports

var _ = require('lodash');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var inquirer = require('inquirer');
var path = require('path');
var async = require('async');

// --------------------------------------------------
// Project imports

function createComponentTemplateData(args) {
  var rawFilePath = args[0];
  var componentNameIsSpecified = rawFilePath.charAt(rawFilePath.length - 1) === '.';
  var componentFilePathSplit = rawFilePath.split('/');

  var directoryPath = componentNameIsSpecified ? _.initial(componentFilePathSplit).join('/') : componentFilePathSplit.join('/');
  var componentName = componentNameIsSpecified ? _.chain(componentFilePathSplit).last().trimRight('.').value() : _.chain(componentFilePathSplit).last().capitalize().value();
  var cssClassName = args[1] || _.kebabCase(componentName);

  return {
    directoryPath: directoryPath,
    componentName: componentName,
    cssClassName: cssClassName
  }
}

// --------------------------------------------------
// Tasks

gulp.task('component', function (done) {
  var templateData = createComponentTemplateData(gulp.args);

  async.parallel([

    function(subTaskDone){
      gulp.src(__dirname + '/templates/component/Component.jsx')
        .pipe(template(templateData))
        .pipe(rename(templateData.componentName + '.jsx'))
        .pipe(conflict('./', {
          defaultChoice: 'd'
        }))
        .pipe(gulp.dest(templateData.directoryPath))
        .on('finish', function() {
          subTaskDone();
        });
    },

    function(subTaskDone){
      gulp.src(__dirname + '/templates/component/Styles.scss')
        .pipe(template(templateData))
        .pipe(rename(templateData.componentName + '.scss'))
        .pipe(conflict('./', {
          defaultChoice: 'd'
        }))
        .pipe(gulp.dest(templateData.directoryPath))
        .on('finish', function() {
            subTaskDone
        });
    }

  ], function() {
    done()
  });

});
