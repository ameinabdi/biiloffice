import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SingleCourse from './single-course';
import SingleCourseDetail from './single-course-detail';
import SingleCourseUpdate from './single-course-update';
import SingleCourseDeleteDialog from './single-course-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SingleCourseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SingleCourseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SingleCourseDetail} />
      <ErrorBoundaryRoute path={match.url} component={SingleCourse} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SingleCourseDeleteDialog} />
  </>
);

export default Routes;
