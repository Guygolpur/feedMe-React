import React, { Component } from "react";

class Recipe extends Component {
  render() {
    return(
      <div className='recipe'>               
          <div>
            {this.props.children}
          </div>
      </div>
    )
  }
}

export default Recipe;