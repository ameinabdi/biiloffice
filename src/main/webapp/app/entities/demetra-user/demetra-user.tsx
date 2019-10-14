import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './demetra-user.reducer';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDemetraUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DemetraUser extends React.Component<IDemetraUserProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { demetraUserList, match } = this.props;
    return (
      <div>
        <h2 id="demetra-user-heading">
          Demetra Users
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Demetra User
          </Link>
        </h2>
        <div className="table-responsive">
          {demetraUserList && demetraUserList.length > 0 ? (
            <Table responsive aria-describedby="demetra-user-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Borndate</th>
                  <th>Cf</th>
                  <th>Usertype</th>
                  <th>Coursetitle</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {demetraUserList.map((demetraUser, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${demetraUser.id}`} color="link" size="sm">
                        {demetraUser.id}
                      </Button>
                    </td>
                    <td>{demetraUser.gender}</td>
                    <td>{demetraUser.address}</td>
                    <td>
                      <TextFormat type="date" value={demetraUser.borndate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{demetraUser.cf}</td>
                    <td>{demetraUser.usertype}</td>
                    <td>
                      {demetraUser.coursetitles
                        ? demetraUser.coursetitles.map((val, j) => (
                            <span key={j}>
                              <Link to={`single-course/${val.id}`}>{val.title}</Link>
                              {j === demetraUser.coursetitles.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${demetraUser.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${demetraUser.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${demetraUser.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Demetra Users found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ demetraUser }: IRootState) => ({
  demetraUserList: demetraUser.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemetraUser);
