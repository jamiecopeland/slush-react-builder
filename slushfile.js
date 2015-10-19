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

function requireSafe(filePath) {
  var obj;

  try {
    obj = require(filePath);
  } catch (error) {
  }

  return obj;
}

function getSlushConfig() {
  // If no local override is present use the global config
  var config = requireSafe(path.resolve('./slushconfig.js')) || requireSafe(path.resolve(__dirname, 'slushconfig.js'));

  if(!config.templateDirectoryPath) {
    throw(new Error('Error: templateDirectoryPath property is missing from slushconfig.js'))
  }

  if(!config.styleFileExtension) {
    throw(new Error('Error: styleFileExtension property is missing from slushconfig.js'))
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
          defaultChoice: 'n'
        }))
        .pipe(gulp.dest(templateData.directoryPath))
        .on('finish', function() {
          subTaskDone();
        });
    },

    function(subTaskDone){
      gulp.src(path.resolve(config.templateDirectoryPath, 'component', `Style.${config.styleFileExtension}`))
        .pipe(template(templateData))
        .pipe(rename(templateData.componentName + `.${config.styleFileExtension}`))
        .pipe(conflict('./', {
          defaultChoice: 'n'
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
