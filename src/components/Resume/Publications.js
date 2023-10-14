import React from 'react';
import PropTypes from 'prop-types';

import Papers from './Publications/Paper';

const Publications = ({ data }) => (
  <div className="education">
    <div className="link-to" id="publications" />
    <div className="title">
      <h3>Published Research</h3>
    </div>
    {data.map((paper) => (
      <Papers
        data={paper}
        key={paper.title}
      />
    ))}
  </div>
);

Publications.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    publisher: PropTypes.string,
    publisher_link: PropTypes.string,
    publication_date: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
  })),
};

Publications.defaultProps = {
  data: [],
};

export default Publications;
