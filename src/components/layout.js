import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';
import Menu from './menu';
import TagCloud from './TagCloud';
import { FaTwitter, FaInstagram, FaLink } from 'react-icons/fa';
import { IconLink } from './IconLink';
import { GlobalStyles } from 'twin.macro';

const LayoutWrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: var(--spacing-10) var(--spacing-5);
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const GlobalHeader = styled.header`
  margin-bottom: var(--spacing-12);
`;

const MainHeading = styled.div`
  font-size: var(--fontSize-4);
  margin: 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: var(--fontSize-7);
  }
`;

const HeaderLinkHome = styled.div`
  display: flex;
  justify-content: center;
  font-weight: var(--fontWeight-bold);
  font-family: var(--font-heading);
  text-decoration: none;
  font-size: var(--fontSize-4);
`;

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
`;

const Layout = ({ isHomePage, children }) => {
  const {
    site: {
      meta: { links },
    },
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        meta: siteMetadata {
          links {
            twitter
            instagram
            linktree
          }
        }
      }
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyles />
      <Menu width={410} />
      <LayoutWrapper>
        <GlobalHeader>
          {isHomePage ? (
            <MainHeading>
              <Link to="/">{parse(title)}</Link>
            </MainHeading>
          ) : (
            <HeaderLinkHome>
              <Link to="/">{title}</Link>
            </HeaderLinkHome>
          )}
        </GlobalHeader>
        <main>{children}</main>
        <TagCloud />
        <FooterWrapper>
          <p>
            <small>
              Copyright © {new Date().getFullYear()} pitang1965 All Rights
              Reserved.
            </small>
          </p>
          <IconLink
            href={links.twitter}
            icon={<FaTwitter tw="w-4 h-4 fill-current" />}
            label="Twitter"
          />
          <IconLink
            href={links.instagram}
            icon={<FaInstagram tw="w-4 h-4 fill-current" />}
            label="Instagram"
          />
          <IconLink
            href={links.linktree}
            icon={<FaLink tw="w-4 h-4 fill-current" />}
            label="Linktree"
          />
        </FooterWrapper>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
