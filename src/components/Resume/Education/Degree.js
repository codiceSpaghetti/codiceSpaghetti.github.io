import React from 'react';
import PropTypes from 'prop-types';

const Degree = ({ data }) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{data.degree}</h4>
      <p className="school"><a href={data.link}>{data.school}</a>, {data.year}</p>
    </header>
    <p className="description">{data.description}</p>
    {data.thesis && (
      <p className="thesis"> <b>Thesis: </b>
        {data.thesis_link ? (
          <a href={data.thesis_link}>{data.thesis}</a>
        ) : (
          data.thesis
        )}
      </p>
    )}
  </article>
);

Degree.propTypes = {
  data: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    thesis: PropTypes.string,
    thesis_link: PropTypes.string,
  }).isRequired,
};

export default Degree;
