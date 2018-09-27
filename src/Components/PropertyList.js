import React, { Component } from 'react';

class PropertyList extends Component {
  render(){

    const {list} = this.props;

    console.log(list);

    return(

      <div className="ths-property-list-container">

      {
        list.map( property =>

          <div key={property.id} className="ths-list-item">

            <p>{property.id}: {property.name}</p>

          </div>
        )
      }

{/*JSON.stringify(list)*/}

      </div>

    );
  }
}

export default PropertyList;
