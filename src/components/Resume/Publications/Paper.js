import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const Paper = ({ data }) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{data.title}</h4>
      <p className="school"><a href={data.publisher_link}>{data.publisher}</a></p>
      <p className="daterange"> {dayjs(data.publication_date).format('MMMM YYYY')}</p>
    </header>
    <p className="description">{data.description} <a href={data.link}> Official paper website.</a></p>
  </article>
);

Paper.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    publisher_link: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Paper;
