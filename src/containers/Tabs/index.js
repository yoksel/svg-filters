import React, {Component} from 'react';
import {withRouter} from 'react-router';

import TabsTemplate from '../../components/Tabs';

class Tabs extends Component {
  state = {
    active: this.props.active || this.props.items[0].id
  };

  setActive = () => {
    let {section} = this.props.match.params;
    if (!section) {
      section = 'primitives';
    }

    this.setState({
      active: section
    });
  };

  componentDidMount() {
    this.setActive();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.section !== this.props.match.params.section) {
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
