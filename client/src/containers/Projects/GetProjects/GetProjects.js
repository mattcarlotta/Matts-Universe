import { map, isEmpty } from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import AdminPanel from '../../App/AdminPanel/AdminPanel';
import RenderProject from '../../../components/Projects/RenderProject/renderProject';
import Spinner from '../../../components/Loaders/spinner';
import NoItemsFound from '../../../components/App/NoItemsFound/noItemsFound';
import { fetchProjects } from '../../../actions/projectActionCreators';

class GetProjects extends Component {
  state = {
    isLoading: true,
    projects: [],
  };

  componentDidMount = () => this.grabProjects();

  grabProjects = () => {
    this.props
      .fetchProjects()
      .then(({ data }) => {
        this.setState({ ...data, isLoading: false });
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  render = () => {
    if (this.state.isLoading) return <Spinner />;

    return isEmpty(this.state.projects) ? (
      <NoItemsFound type="projects" />
    ) : (
      <Fragment>
        <AdminPanel
          updateProjects={this.grabProjects}
          projects={this.state.projects}
        />
        <Carousel>
          {map(this.state.projects, (project, key) => (
            <div key={key}>
              <RenderProject {...project} />
            </div>
          ))}
        </Carousel>
      </Fragment>
    );
  };
}

export default connect(
  null,
  { fetchProjects },
)(GetProjects);

GetProjects.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
};
