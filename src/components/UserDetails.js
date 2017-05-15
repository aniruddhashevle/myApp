import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.userData = this.props.userAllInfo;
  }

  componentWillMount() {
    if(!this.userData || !this.userData.userName || !this.userData.age || !this.userData.dateOfBirth || !this.userData.gender) {
      browserHistory.push("/");
    }
  }

  componentWillUnmount() {
    this.userData = null;
    browserHistory.push("/");
  }

  render() {    
    return (
      <div>
        <h1>User:</h1>
        <ul>
          <li>Username: {this.userData ? this.userData.userName : null}</li>
          <li>Age: {this.userData ? this.userData.age : null}</li>
          <li>Date Of Birth: {this.userData ? this.userData.dateOfBirth : null}</li>
          <li>Gender: {this.userData ? this.userData.gender : null}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		userAllInfo: state.userData.userAllInfo ? state.userData.userAllInfo : null
	}
}

export default connect(
	mapStateToProps,{
})(UserDetails);
