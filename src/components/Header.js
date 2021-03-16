import React from 'react';
import { Link } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  margin-bottom: var(--spacing-12);
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-weight: var(--fontWeight-bold);
  position: fixed;
  left: 90px;
  height: 60px;
  backdrop-filter: blur(0.1rem);
  z-index: 10;

  font-size: var(--fontSize-2);

  @media (min-width: 375px) {
    font-size: var(--fontSize-3);
  }

  @media (min-width: 768px) {
    font-size: var(--fontSize-7);
  }
`;

const Header = ({ title, isHomePage }) => {
  return (
    <HeaderWrapper>
      {isHomePage ? (
        <Heading>
          <Link to="/">{parse(title)}</Link>
        </Heading>
      ) : (
        <Heading>
          <Link to="/">{title}</Link>
        </Heading>
      )}
    </HeaderWrapper>
  );
};

export default Header;
