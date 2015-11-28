# slush-react-builder

A Slush generator for ES6 React components that creates a .jsx file and a .scss (or css, less, stylus etc) file at a specified path.

This generator assumes a modular development style using Webpack* with jsx and style files living along side each other in one directory.

Defaults templates are provided but can be overriden on a per project basis.

*Or any other build tool that allows style files to be required within JavaScript files.

## Installation
Slush templates need to be installed globally, which usually means prefixing the line below with a ```sudo```.
```
npm install -g slush-react-builder
```

## Usage

*__WARNING: Conflict resolution is on the roadmap but not yet implemented. If new components are generated in the same location as existing ones, older files will overrwritten__*

First navigate to the root of your project.
### Component names by convention
Naming can be done by convention, where a capitalized version of the last segment of the path will be used as the component and style file name.
```
$ slush react-builder:component src/client/components/mapView
```
Creates:
- src/client/components/mapView/MapView.jsx
- src/client/components/mapView/MapView.scss


### Component names by configuration
If more control is required over naming, a file name may also be be specified.
```
$ slush react-builder:component src/client/components/mapView SpecialMapView
```
Creates:
- src/client/components/mapView/SpecialMapView.jsx
- src/client/components/mapView/SpecialMapView.scss

## Templates
### Default templates
The following templates are provided by default.

#### JSX (.jsx)
```javascript
import React from 'react';

require('./MapView.scss');

export default class MapView extends React.Component; {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MapView"></div>
    );
  }

}
```

#### Sass (.scss)
```css
.MapView {
}
```


### Overriding templates
If you'd prefer a different jsx or style template, add a slushconfig.js to your application root:

```javascript
module.exports = {
  "templateDirectoryPath": "./mySlushTemplates",
  "styleFileExtension": "css"
}
```
|Property | Description|
|:--- |:---|
| ```templateDirectoryPath``` | The directory containing the templates. |
| ```styleFileExtension``` | The extension of the style file - e.g. scss/less/css etc. |

For the example above the directory structure should be as follows:
```
-myProjectRoot
    - mySlushTemplates
        - component
            - Component.jsx
            - Style.css
```
## Roadmap
- Full project generation (via my [react-boilerplate](https://github.com/jamiecopeland/react-boilerplate) or [react-express-boilerplate](https://github.com/jamiecopeland/react-express-boilerplate) and  [nodegit](https://github.com/nodegit/nodegit)).
- Conflict resolution for file path clashes.








