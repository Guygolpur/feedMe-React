import React, { Component } from "react";

class Favorite extends Component {
  render() {
    return(
      <div className='favorite'>               
          <div>
            {this.props.children}
          </div>
      </div>
    )
  }
}

export default Favorite;
