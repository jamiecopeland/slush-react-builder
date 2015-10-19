'use strict';

// --------------------------------------------------
// Imports

var _ = require('lodash');
var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var inquirer = require('inquirer');
var path = require('path');
var async = require('async');
var fs = require('fs');

// --------------------------------------------------
// Helpers

function createComponentTemplateData(args) {
  var rawFilePath = args[0];
  var componentNameIsSpecified = rawFilePath.charAt(rawFilePath.length - 1) === '.';
  var componentFilePathSplit = rawFilePath.split('/');

  var directoryPath = componentNameIsSpecified ? _.initial(componentFilePathSplit).join('/') : componentFilePathSplit.join('/');
  var componentName = componentNameIsSpecified ? _.chain(componentFilePathSplit).last().trimRight('.').value() : _.chain(componentFilePathSplit).last().capitalize().value();
  var cssClassName = args[1] || componentName;

  return {
    directoryPath: directoryPath,
    componentName: componentName,
    cssClassName: cssClassName
  }
}

function readFileSafe(path, defaultValue) {
  var obj;
  try {
    obj = JSON.parse(fs.readFileSync(path));
  } catch (error) {
    obj = defaultValue;
  }
  return obj;
}

function stringHasLength(str) {
  try {
    if(str && str.length >= 1) {
      return true;
    } else {
      return false;
    }
  } catch(error) {
    return false;
  }
}

function getSlushConfig() {
  var config = readFileSafe('./slushconfig.json') || readFileSafe(path.join(__dirname, '/slushconfig.json'));

  if(!config.templateDirectoryPath) {
    throw(new Error('Error: templateDirectoryPath property is missing from slushconfig.json'))
  }

  if(!config.styleFileType) {
    throw(new Error('Error: styleFileType property is missing from slushconfig.json'))
  }

  return config;
}

// --------------------------------------------------
// Tasks

gulp.task('component', function (done) {

  var config = getSlushConfig();
  var templateData = createComponentTemplateData(gulp.args);

  async.parallel([

    function(subTaskDone){
      gulp.src(path.resolve(config.templateDirectoryPath, 'component', 'Component.jsx'))
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
      console.log('style: ', path.resolve(config.templateDirectoryPath, 'component', `Style.${config.styleFileType}`));
      gulp.src(path.resolve(config.templateDirectoryPath, 'component', `Style.${config.styleFileType}`))
        .pipe(template(templateData))
        .pipe(rename(templateData.componentName + `.${config.styleFileType}`))
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
