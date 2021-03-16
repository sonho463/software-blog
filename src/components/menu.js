import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { slide as Animation } from 'react-burger-menu';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    backdrop-filter: blur(0.1rem);
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #005b99;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: white;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    text-decoration: none;
    outline: none;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const FirstLevel = styled.div`
  font-weight: bold;
  color: black;
  &:hover {
    background: var(--color-accent);
  }
`;

const SecondLevel = styled.div`
  font-size: 0.9em;
  margin-left: 1em;
  color: black;
  &:hover {
    background: var(--color-accent);
  }
`;

const Menu = props => {
  const data = useStaticQuery(graphql`
    {
      allWpPage(sort: { fields: [menuOrder], order: ASC }) {
        edges {
          node {
            status
            title
            uri
            menuOrder
            ancestors {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  `);

  return (
    <MenuWrapper>
      <Animation {...props}>
        {data.allWpPage.edges.map(edge =>
          edge.node.status === 'publish' ? (
            <Link to={edge.node.uri} className="menu-item" key={edge.node.uri}>
              {edge.node.ancestors === null ? (
                <FirstLevel>{edge.node.title}</FirstLevel>
              ) : (
                <SecondLevel>{edge.node.title}</SecondLevel>
              )}
            </Link>
          ) : null
        )}
      </Animation>
    </MenuWrapper>
  );
};

export default Menu;
