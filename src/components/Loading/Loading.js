import React from 'react';

import './Loading.scss';

const Loading = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <div className="loading"></div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
