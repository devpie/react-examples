import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setVisibilityFilter, VisibilityFilter, VisibilityFilterAction} from '../actions';
import Link from '../components/Link';
import {MainState} from '../state';

type OwnProps = {
  filter: VisibilityFilter
}

const mapStateToProps = (state: MainState, ownProps: OwnProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch: Dispatch<VisibilityFilterAction>, ownProps: OwnProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
