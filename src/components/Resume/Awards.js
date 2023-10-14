import React from 'react';
import PropTypes from 'prop-types';

import Awards from './Awards/Award';

const Prizes = ({ data }) => (
  <div className="education">
    <div className="link-to" id="awards" />
    <div className="title">
      <h3>Honors & Awards</h3>
    </div>
    {data.map((award) => (
      <Awards
        data={award}
        key={award.title}
      />
    ))}
  </div>
);

Prizes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    publisher: PropTypes.string,
    publisher_link: PropTypes.string,
    publication_date: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
  })),
};

Prizes.defaultProps = {
  data: [],
};

export default Prizes;
