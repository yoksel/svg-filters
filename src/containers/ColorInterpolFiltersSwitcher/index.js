import React, {Component} from 'react';

import {connect} from 'react-redux';

import {setColorInterpolFilters as setColorInterpolFiltersAction} from '../../store/actions';

import RadioList from '../../components/RadioList';

const colorInterpolList = [
  {
    id: 'sRGB',
    name: 'sRGB'
  },
  {
    id: 'linearRGB',
    name: 'linearRGB'
  }
];

class ColorInterpolFiltersSwitcher extends Component {
  render() {
    const {
      colorInterpolationFilters = 'linearRGB',
      setColorInterpolFilters
    } = this.props;

    return (
      <div className="ColorInterpolFiltersSwitcher">
        <RadioList
          name="color-interpolation-filters"
          list={colorInterpolList}
          current={colorInterpolationFilters}
          onChange={(colorInterpol) => {
            setColorInterpolFilters(colorInterpol);
          }}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    colorInterpolationFilters: state.primitives.filter.colorInterpolationFilters
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    setColorInterpolFilters: (colorInterpolationFilters) => {
      dispatch(setColorInterpolFiltersAction({colorInterpolationFilters}));
    }
  };
};

ColorInterpolFiltersSwitcher = connect(
  mapStateToProps,
  mapDispatchProps
)(ColorInterpolFiltersSwitcher);

export default ColorInterpolFiltersSwitcher;
