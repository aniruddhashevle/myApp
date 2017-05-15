/* =============================================================================
   imports
============================================================================= */
/* npm */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

/* components */
import App from '../components/App';
import UserInfoSecond from '../components/UserInfoSecond';
import UserInfoFirst from '../components/UserInfoFirst';
import UserDetails from '../components/UserDetails';

/* =============================================================================
   Root Route Object
============================================================================= */
const rootRoute = (
  <Route path="/" component={App}>

  	{/* Route for User Info Step 1 */}
		<IndexRoute components={UserInfoFirst}/>
	
		{/* Route for User Info Step 2 */}
    <Route path="/sign-up" component={UserInfoSecond} />
	
	  {/* Route for User Details after Successful Signed Up */}
    <Route path="/user-details" component={UserDetails} />
  
  </Route>
);

export default rootRoute;