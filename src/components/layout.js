import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Menu from './menu';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import { GlobalStyles } from 'twin.macro';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template:
    '... ...... ...... ......  ...' var(--spacing-5)
    '... header header header  ...' 
    '... main   ...... sidebar ...' 1fr
    '... footer footer footer  ...'
    '... ...... ...... ......  ...' var(--spacing-5)
    / minmax(var(--spacing-5), 1fr) minmax(400px, 5fr) var(--spacing-5) 340px minmax(var(--spacing-5), 1fr);

  @media (max-width: 768px) {
    grid-template:
      '... ......  ...' var(--spacing-5)
      '... header  ...'
      '... main    ...' 1fr
      '... sidebar ...'
      '... footer  ...'
      / var(--spacing-5) 1fr var(--spacing-5);
  }

  min-height: 100vh;

  header {
    grid-area: header;
  }

  footer {
    grid-area: footer;
  }

  main {
    grid-area: main;
  }

  aside {
    grid-area: sidebar;
  }
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

  console.log(window.innerWidth);

  return (
    <>
      <GlobalStyles />
      <Menu width={410 < window.innerWidth ?  410 : '80%'} />
      <LayoutWrapper>
        <Header title={title} isHomePage={isHomePage} />
        <main>{children}</main>
        <SideBar />
        <Footer links={links} />
      </LayoutWrapper>
    </>
  );
};

export default Layout;
