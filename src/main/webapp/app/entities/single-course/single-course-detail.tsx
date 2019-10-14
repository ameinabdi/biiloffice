import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './single-course.reducer';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISingleCourseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SingleCourseDetail extends React.Component<ISingleCourseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { singleCourseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SingleCourse [<b>{singleCourseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{singleCourseEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{singleCourseEntity.description}</dd>
            <dt>
              <span id="isnotonlyfordegree">Isnotonlyfordegree</span>
            </dt>
            <dd>{singleCourseEntity.isnotonlyfordegree ? 'true' : 'false'}</dd>
            <dt>
              <span id="cfu">Cfu</span>
            </dt>
            <dd>{singleCourseEntity.cfu}</dd>
          </dl>
          <Button tag={Link} to="/entity/single-course" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/single-course/${singleCourseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ singleCourse }: IRootState) => ({
  singleCourseEntity: singleCourse.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCourseDetail);
