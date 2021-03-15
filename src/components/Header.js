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
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(255, 255, 255, 0.7);
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
