import { map, isEmpty } from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import AdminPanel from '../../App/AdminPanel/AdminPanel';
import RenderProjects from '../../../components/Projects/RenderProjects/renderProjects';
import Loading from '../../App/Loading/Loading';
import { fetchProjects } from '../../../actions/projectActionCreators';

class GetProjects extends Component {
  componentDidMount = () => !this.props.projects && this.grabProjects();

  grabProjects = () => this.props.fetchProjects();

  render = () => {
    const { projects } = this.props;

    return isEmpty(projects) ? (
      <Loading items={projects} message="No projects were found!" />
    ) : (
      <Fragment>
        <AdminPanel
          updateProjectItems={this.grabProjects}
          projects={projects}
        />
        <Carousel>
          {map(projects, (project, key) => (
            <div key={key}>
              <RenderProjects {...project} />
            </div>
          ))}
        </Carousel>
      </Fragment>
    );
  };
}

export default connect(
  state => ({ projects: state.works.projects }),
  { fetchProjects },
)(GetProjects);

GetProjects.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
};
