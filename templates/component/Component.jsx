// --------------------------------------------------
// Library imports

import React from 'react';
import reactMixin from 'react-mixin';

// --------------------------------------------------
// Project imports

// --------------------------------------------------
// Sass imports

import sass from './<%= componentName %>.scss';

// --------------------------------------------------
// Class definition

class <%= componentName %> extends React.Component {

  constructor(props) {
    super(props);
  }

  // --------------------------------------------------
  // Lifecycle methods

  render() {
    return (
      <div className="<%= cssClassName %>"></div>
    );
  }

}

module.exports = <%= componentName %>;
