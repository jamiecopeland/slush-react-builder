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

function createComponentTemplateData(componentFilePath) {
  var componentFilePathSplit = componentFilePath.split('/');

  var directoryPath = _.initial(componentFilePathSplit).join('/');
  var componentName = _.last(componentFilePathSplit);
  var cssClassName = _.kebabCase(componentName);

  return {
    directoryPath: directoryPath,
    componentName: componentName,
    cssClassName: cssClassName
  }
}

// --------------------------------------------------
// Tasks

gulp.task('component', function (done) {

  var filePath = gulp.args[0];
  var templateData = createComponentTemplateData(filePath);

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
        .pipe(rename(templateData.cssClassName + '.scss'))
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
