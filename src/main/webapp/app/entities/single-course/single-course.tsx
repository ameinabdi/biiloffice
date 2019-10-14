import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './single-course.reducer';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISingleCourseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SingleCourse extends React.Component<ISingleCourseProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { singleCourseList, match } = this.props;
    return (
      <div>
        <h2 id="single-course-heading">
          Single Courses
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Single Course
          </Link>
        </h2>
        <div className="table-responsive">
          {singleCourseList && singleCourseList.length > 0 ? (
            <Table responsive aria-describedby="single-course-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Isnotonlyfordegree</th>
                  <th>Cfu</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {singleCourseList.map((singleCourse, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${singleCourse.id}`} color="link" size="sm">
                        {singleCourse.id}
                      </Button>
                    </td>
                    <td>{singleCourse.title}</td>
                    <td>{singleCourse.description}</td>
                    <td>{singleCourse.isnotonlyfordegree ? 'true' : 'false'}</td>
                    <td>{singleCourse.cfu}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${singleCourse.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${singleCourse.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${singleCourse.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Single Courses found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ singleCourse }: IRootState) => ({
  singleCourseList: singleCourse.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCourse);
