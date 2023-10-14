/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {Object[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Translated',
    position: 'Deep Learning Scientist',
    url: 'https://translated.com/welcome',
    startDate: '2023-10-01',
    summary: 'Translated is a is a leading Multi-Language Service Provider, based in Rome, Italy, who manages translation projects for over 55,000 customers, including Airbnb, Google, IBM, Expedia, Uber, EU and Amazon. I work there as a Deep Learning Scientist, where I develop and deploy NLP models for Machine Translation and Language Identification.',
    highlights: [{
      title: 'Language Expansion',
      description: 'I lead the project, which involved all the phases from the feasibility study to the preparation of everything necessary for production, to expand the number of supported languages by MMT from 56 to 201. After this project our MT engine was the first in the world in terms of language coverage.',
      link: 'https://blog.modernmt.com/modernmt-significantly-expands-language-coverage/',
    },
    {
      title: 'Trust Attention',
      description: 'I had the intuition for a novel technique that prioritizes the most valuable training data. This approach played a pivotal role in significantly enhancing the quality of machine translation, resulting in improvements unseen in the past five years.',
      link: 'https://blog.modernmt.com/modernmt-introduces-trust-attention-to-improve-mt-quality/',
    },
    {
      title: 'Polyglot-200',
      description: 'I expanded the language support of the Language Identification model from around 52 languages to approximately 195 while maintaining the same level of performance and inference time.',
    }],
  },
];

export default work;
