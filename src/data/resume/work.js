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
    position: 'AI Engineer & Researcher',
    url: 'https://translated.com/welcome',
    startDate: '2023-10-01',
    summary: 'Translated is a is a leading Multi-Language Service Provider, based in Rome, Italy, who manages translation projects for over 55,000 customers, including Airbnb, Google, IBM, Expedia, Uber, EU and Amazon. I work there as a AI Engineer & Researcher, where I develop and deploy NLP models for Machine Translation and Language Identification.',
    highlights: [{
      title: 'Language Expansion',
      description: 'I expanded the number of supported languages by our MT from 56 to 201, making it the first commercial translation engine in the world with such extensive language support',
      link: 'https://blog.modernmt.com/modernmt-significantly-expands-language-coverage/',
    },
    {
      title: 'Trust Attention',
      description: 'I had the intuition for a novel technique that prioritizes the most valuable training data. This approach played a pivotal role in significantly enhancing the quality of machine translation, resulting in improvements unseen in the past five years.',
      link: 'https://blog.modernmt.com/modernmt-introduces-trust-attention-to-improve-mt-quality/',
    },
    {
      title: 'LLM-based translation model',
      description: 'I was chosen to be part of a new team specifically dedicated to build the next generation of machine translation with a different paradigm based on Large Language Model',
    },
    {
      title: 'Polyglot',
      description: 'I expanded the language support of the Language Identification model from 56 to 201 languages, all while maintaining the same level of accuracy and inference time.',
    }],
  },
];

export default work;
