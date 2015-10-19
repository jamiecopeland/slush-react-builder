import React from 'react';

require('./<%= componentName %>.scss');

export default class <%= componentName %> extends React.Component; {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="<%= cssClassName %>"></div>
    );
  }

}
