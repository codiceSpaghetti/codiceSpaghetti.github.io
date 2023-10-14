import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.png`} alt="" />
      </Link>
      <header>
        <h2>Alessio Serra</h2>
        <p><a href="mailto:alessio.ser29@gmail.com">alessio.ser29@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Alessio. I hold a Bachelor&apos;s degree in Computer Engineering and a
        Master&apos;s degree in Artificial Intelligence and Data Engineering, both from the <a href="https://www.unipi.it/">University of Pisa. </a>
        Currently, I am putting my expertise to work as a Deep Learning Scientist within the AI Research team at <a href="https://translated.com/welcome">Translated. </a>
        I am developing a skill set that bridges research and engineering, allowing me to create
        practical AI solutions with a clear impact on real-world applications.
      </p>
      <p>I&apos;m an insatiably curious and determined individual, always eager to
        embrace new challenges and actively engage with them.
        Within my wide range of interests, Artificial Intelligence holds a particularly significant
        place, with a dedicated focus on Natural Language Processing and Computer Vision.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Alessio Serra <Link to="/">alessio.serra.com</Link>.</p>
    </section>
  </section>
);

export default SideBar;
