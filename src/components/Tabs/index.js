import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Tabs.css';

class Tabs extends Component {
  state = {
    active: this.props.currentTab || this.props.items[0].id
  };

  setActive = (tabName) => {
    this.setState({
      active: tabName
    });
  };

  render() {
    const {items} = this.props;
    const tabsList = items.reduce((prev, item) => {
      const id = item.id;
      const name = item.name;

      let buttonClass = 'Tabs__control';
      if (id === this.state.active) {
        buttonClass += ` ${buttonClass}--active`;
      }

      const button = <button
        key={id}
        className={buttonClass}
        onClick={() => {
          this.setActive(id);
        }}
      >
        <span className="Tabs__control-text">
          {name}
        </span>
      </button>;

      let contentClass = 'Tabs__item';
      if (id === this.state.active) {
        contentClass += ` ${contentClass}--active`;
      }
      const content = <div
        key={id}
        className={contentClass}
      ><item.content/></div>;

      prev.controls.push(button);
      prev.tabs.push(content);

      return prev;
    },{
      controls: [],
      tabs: []
    });

    return (
      <div className="Tabs">
        <div className="Tabs__controls">
          {tabsList.controls}
        </div>
        {tabsList.tabs}
      </div>
    );
  }
}

export default Tabs;

Tabs.propTypes = {
  items: PropTypes.array
};
