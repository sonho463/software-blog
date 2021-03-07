import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';
import Menu from './menu';
import TagCloud from './TagCloud';
import { FaTwitter, FaInstagram, FaLink } from 'react-icons/fa';
import { IconLink } from './IconLink';
import { GlobalStyles } from 'twin.macro';

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
      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <header className="global-header">
          {isHomePage ? (
            <h1 className="main-heading">
              <Link to="/">{parse(title)}</Link>
            </h1>
          ) : (
            <Link className="header-link-home" to="/">
              {title}
            </Link>
          )}
        </header>
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
      </div>
    </>
  );
};

export default Layout;
