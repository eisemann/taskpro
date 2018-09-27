import React, { Component } from 'react';

// // ES6 double arrow, higher order function
// const isSearched =
//   searchTerm =>
//     item => item.title.toLowerCase().includes(searchTerm.toLowerCase());


// {
//   list.map( profile =>
//
//     <div key={profile.id} className="ths-list-item">
//       <p>{profile.name}</p>
//     </div>
//   )
// }

class ProfileList extends Component {
  render(){

    const {list} = this.props;

    console.log(list);

    return(

      <div className="ths-profile-list-container">

      {
        list.map( profile =>

          <div key={profile.id} className="ths-list-item">

            <p>{profile.id}: {profile.name} ({profile.email})</p>


          </div>
        )
      }

{/*JSON.stringify(list)*/}

      </div>

    );
  }
}

export default ProfileList;
