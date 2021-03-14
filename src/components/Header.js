import React from 'react';
import { Link } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  margin-bottom: var(--spacing-12);
`;

const Heading = styled.div`
  font-size: var(--fontSize-4);
  text-align: center;
  font-family: var(--font-heading);
  font-weight: var(--fontWeight-bold);

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
