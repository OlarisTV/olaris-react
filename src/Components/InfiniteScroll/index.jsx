import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class InfiniteScroll extends Component {
    shouldComponentUpdate(nextProps) {
        const { viewport: nextViewport } = nextProps;
        const { viewport: prevViewport, id, length } = this.props;

        if (
            nextViewport[id].scrollTop !== prevViewport[id].scrollTop ||
            nextProps.length !== length
        ) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        const { viewport, id, threshold, onLoadMore } = this.props;
        const viewData = viewport[id];
        const bottomOffset =
            viewData.scrollHeight -
            (viewData.scrollTop + viewData.clientHeight);

        if (bottomOffset < threshold) {
            onLoadMore();
        }
    }

    render() {
        const { children } = this.props;

        return children();
    }
}

InfiniteScroll.propTypes = {
    viewport: PropTypes.objectOf(PropTypes.object).isRequired,
    threshold: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
};

const mapStateToProps = ({ viewport }) => ({ viewport });

export default connect(
    mapStateToProps,
    null,
)(InfiniteScroll);
