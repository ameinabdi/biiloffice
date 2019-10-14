import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './demetra-user.reducer';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDemetraUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DemetraUserDetail extends React.Component<IDemetraUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { demetraUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            DemetraUser [<b>{demetraUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{demetraUserEntity.gender}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{demetraUserEntity.address}</dd>
            <dt>
              <span id="borndate">Borndate</span>
            </dt>
            <dd>
              <TextFormat value={demetraUserEntity.borndate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="cf">Cf</span>
            </dt>
            <dd>{demetraUserEntity.cf}</dd>
            <dt>
              <span id="usertype">Usertype</span>
            </dt>
            <dd>{demetraUserEntity.usertype}</dd>
            <dt>Coursetitle</dt>
            <dd>
              {demetraUserEntity.coursetitles
                ? demetraUserEntity.coursetitles.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.title}</a>
                      {i === demetraUserEntity.coursetitles.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/demetra-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/demetra-user/${demetraUserEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ demetraUser }: IRootState) => ({
  demetraUserEntity: demetraUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemetraUserDetail);
