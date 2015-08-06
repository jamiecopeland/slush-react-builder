
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

module.exports = {
  createComponentTemplateData: createComponentTemplateData
}