import App from '../components/App';
import UserInfoSecond from '../components/UserInfoSecond';
import UserInfo from '../components/UserInfo';
import UserDetails from '../components/UserDetails';

import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';

// /////////////////////////////////////////////////////////////////////////////
// Root Route Object
// /////////////////////////////////////////////////////////////////////////////

// const rootRoute = {
// 	'path': '/',
// 	'component': App,
// 	'childRoutes': [
// 		{
// 			'path': '/personal',
// 			getComponent(location, cb) {
// 			  require.ensure([], (require) => {
// 			    cb(null, require('../components/UserInfoSecond').default);
// 			  }, 'user-data');
// 			}
// 		},
// 	]
// }

const rootRoute = (
  <Route path="/" component={App} >

		<IndexRoute components={UserInfo}/>
    <Route path="/personal" component={UserInfoSecond} />
    <Route path="/user-details" component={UserDetails} />
  </Route>
);

export default rootRoute;