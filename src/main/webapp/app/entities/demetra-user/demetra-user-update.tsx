import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISingleCourse } from 'app/shared/model/single-course.model';
import { getEntities as getSingleCourses } from 'app/entities/single-course/single-course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './demetra-user.reducer';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDemetraUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDemetraUserUpdateState {
  isNew: boolean;
  idscoursetitle: any[];
}

export class DemetraUserUpdate extends React.Component<IDemetraUserUpdateProps, IDemetraUserUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscoursetitle: [],
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

    this.props.getSingleCourses();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { demetraUserEntity } = this.props;
      const entity = {
        ...demetraUserEntity,
        ...values,
        coursetitles: mapIdList(values.coursetitles)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/demetra-user');
  };

  render() {
    const { demetraUserEntity, singleCourses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="biilOfficeApp.demetraUser.home.createOrEditLabel">Create or edit a DemetraUser</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : demetraUserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="demetra-user-id">ID</Label>
                    <AvInput id="demetra-user-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="genderLabel" for="demetra-user-gender">
                    Gender
                  </Label>
                  <AvField
                    id="demetra-user-gender"
                    type="text"
                    name="gender"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="demetra-user-address">
                    Address
                  </Label>
                  <AvField
                    id="demetra-user-address"
                    type="text"
                    name="address"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="borndateLabel" for="demetra-user-borndate">
                    Borndate
                  </Label>
                  <AvField
                    id="demetra-user-borndate"
                    type="date"
                    className="form-control"
                    name="borndate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cfLabel" for="demetra-user-cf">
                    Cf
                  </Label>
                  <AvField
                    id="demetra-user-cf"
                    type="text"
                    name="cf"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="usertypeLabel" for="demetra-user-usertype">
                    Usertype
                  </Label>
                  <AvField
                    id="demetra-user-usertype"
                    type="text"
                    name="usertype"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="demetra-user-coursetitle">Coursetitle</Label>
                  <AvInput
                    id="demetra-user-coursetitle"
                    type="select"
                    multiple
                    className="form-control"
                    name="coursetitles"
                    value={demetraUserEntity.coursetitles && demetraUserEntity.coursetitles.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {singleCourses
                      ? singleCourses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/demetra-user" replace color="info">
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
  singleCourses: storeState.singleCourse.entities,
  demetraUserEntity: storeState.demetraUser.entity,
  loading: storeState.demetraUser.loading,
  updating: storeState.demetraUser.updating,
  updateSuccess: storeState.demetraUser.updateSuccess
});

const mapDispatchToProps = {
  getSingleCourses,
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
)(DemetraUserUpdate);
