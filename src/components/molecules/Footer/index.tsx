import React from 'react';
import Container from './style';

export const Footer: React.FC = () => {
  return (
    <Container>
      <a
        aria-label="link to mail me"
        className="footer-icons"
        href="mailto:thales.em@gmail.com"
        rel="noopener noreferrer"
      >
        <i className="fa-regular fa-envelope fa-2xl" />
      </a>
      <a
        aria-label="link to my github"
        className="footer-icons"
        href="https://github.com/ThalesMuller"
        rel="noopener noreferrer"
        target="_blank"
      >
        <i className="fa-brands fa-github fa-2xl" />
      </a>
      <a
        rel="noopener noreferrer"
        aria-label="link to my linkedin"
        className="footer-icons"
        href="https://linkedin.com/in/thalesemuller"
        target="_blank"
      >
        <i className="fa-brands fa-linkedin fa-2xl" />
      </a>
    </Container>
  );
};
