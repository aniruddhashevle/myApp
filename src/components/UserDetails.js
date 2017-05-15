import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class UserDetails extends Component {

  render() {
  	console.log('userAllInfo', this.props.userAllInfo);
    return (
      <div>
        { this.props.userAllInfo ? this.props.userAllInfo : null }
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
