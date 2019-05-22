import React, { Component } from 'react';

export default class Ingrediet extends Component {

  render() {
    return(
      <div className=''>               
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}