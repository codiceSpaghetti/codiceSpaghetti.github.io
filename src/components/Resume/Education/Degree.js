import React from 'react';
import PropTypes from 'prop-types';

const Degree = ({ data }) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{data.degree}</h4>
      <p className="school"><a href={data.link}>{data.school}</a>, {data.year}</p>
    </header>
    <p className="description">{data.description}</p>

    <ul className="points">
      <li key="grade">
        <b>Final grade:</b> {data.grade}{' '}
      </li>
      {data.degree === 'M.S. Artificial Intelligence and Data Engineering' && (
      <li key="thesis">
        <b>Thesis published in a Tier A conference</b>
      </li>
      )}
      {data.exam_link && (
      <li key="exam_link">
        <a href={data.exam_link} target="_blank" rel="noopener noreferrer">Exams and Marks link</a>
      </li>
      )}
    </ul>
  </article>
);

Degree.propTypes = {
  data: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    exam_link: PropTypes.string,
  }).isRequired,
};

export default Degree;
