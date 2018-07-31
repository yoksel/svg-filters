import React, {Component} from 'react';
import {withRouter} from 'react-router';

import TabsTemplate from '../../components/Tabs';

class Tabs extends Component {
  state = {
    active: this.props.active || this.props.items[0].id
  };

  setActive = () => {
    let {sidebarList} = this.props.match.params;
    if (!sidebarList) {
      sidebarList = 'primitives';
    }

    this.setState({
      active: sidebarList
    });
  };

  componentDidMount() {
    this.setActive();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.sidebarList !== this.props.match.params.sidebarList) {
      this.setActive();
    }
  }

  render() {
    return (
      <TabsTemplate
        active={this.state.active}
        {...this.props}
      />
    );
  }
}

export default withRouter(Tabs);
