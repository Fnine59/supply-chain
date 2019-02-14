import React from 'react';
import PropTypes from 'prop-types';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: '0px',
    };
  }

  componentDidMount() {
  }

  render() {
    console.log('ifaram');
    return (
      <iframe
        style={{
          width: '100%',
          height: this.state.iFrameHeight,
          overflow: 'visible',
        }}
        onLoad={() => {
          this.setState({
            iFrameHeight: '100%',
          });
        }}
        // eslint-disable-next-line
        ref={(node) => { this.frameRef = node; return null; }}
        src={`${window.baseUrl}${this.props.src || '/'}` || '#'}
        width="100%"
        height={'100%'}
        scrolling="no"
        frameBorder="0"
      />
    );
  }
}

Content.propTypes = {
  src: PropTypes.string,
};

export default Content;
