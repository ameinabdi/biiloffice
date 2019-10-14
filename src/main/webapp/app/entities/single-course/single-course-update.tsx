import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { getEntities as getDemetraUsers } from 'app/entities/demetra-user/demetra-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './single-course.reducer';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISingleCourseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISingleCourseUpdateState {
  isNew: boolean;
  cfstudentId: string;
}

export class SingleCourseUpdate extends React.Component<ISingleCourseUpdateProps, ISingleCourseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cfstudentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDemetraUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { singleCourseEntity } = this.props;
      const entity = {
        ...singleCourseEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/single-course');
  };

  render() {
    const { singleCourseEntity, demetraUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="biilOfficeApp.singleCourse.home.createOrEditLabel">Create or edit a SingleCourse</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : singleCourseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="single-course-id">ID</Label>
                    <AvInput id="single-course-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="single-course-title">
                    Title
                  </Label>
                  <AvField
                    id="single-course-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="single-course-description">
                    Description
                  </Label>
                  <AvField id="single-course-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="isnotonlyfordegreeLabel" check>
                    <AvInput id="single-course-isnotonlyfordegree" type="checkbox" className="form-control" name="isnotonlyfordegree" />
                    Isnotonlyfordegree
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cfuLabel" for="single-course-cfu">
                    Cfu
                  </Label>
                  <AvField id="single-course-cfu" type="string" className="form-control" name="cfu" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/single-course" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  demetraUsers: storeState.demetraUser.entities,
  singleCourseEntity: storeState.singleCourse.entity,
  loading: storeState.singleCourse.loading,
  updating: storeState.singleCourse.updating,
  updateSuccess: storeState.singleCourse.updateSuccess
});

const mapDispatchToProps = {
  getDemetraUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCourseUpdate);
