import React from 'react';

require('./<%= componentName %>.scss');

class <%= componentName %> extends React.Component {

  // --------------------------------------------------
  // Lifecycle methods

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="<%= cssClassName %>"></div>
    );
  }

}

module.exports = <%= componentName %>;
