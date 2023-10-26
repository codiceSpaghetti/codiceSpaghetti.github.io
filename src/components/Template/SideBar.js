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
      <p> <b>Curiosity</b> and <b>Motivation</b> fuel my hard work, while
        <b> Passion</b> makes it look easy
      </p>
      <h4><a href="https://www.unipi.it/">University</a>:</h4>
      <p>Computer Engineering 👨‍💻<br />
        Artificial Intelligence 🤖
      </p>
      <h4><a href="https://translated.com/welcome">Work</a>:</h4>
      <p>
        Deep Learning Scientist 👨‍🔬
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
