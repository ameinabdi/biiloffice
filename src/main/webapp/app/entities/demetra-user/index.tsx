import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DemetraUser from './demetra-user';
import DemetraUserDetail from './demetra-user-detail';
import DemetraUserUpdate from './demetra-user-update';
import DemetraUserDeleteDialog from './demetra-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DemetraUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DemetraUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DemetraUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={DemetraUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DemetraUserDeleteDialog} />
  </>
);

export default Routes;
