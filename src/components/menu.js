import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { slide as Animation } from 'react-burger-menu';
import styled from 'styled-components';

const FirstLevel = styled.div`
  font-weight: bold;
  &:hover {
    background: var(--color-accent);
  }
`;

const SecondLevel = styled.div`
  font-size: 0.9em;
  margin-left: 1em;
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
    <Animation {...props}>
      {data.allWpPage.edges.map(edge =>
        edge.node.status === 'publish' ? (
          <Link to={edge.node.uri} className="menu-item" key={edge.node.uri}>
            {edge.node.ancestors === null
              ? <FirstLevel>{edge.node.title}</FirstLevel>
              : <SecondLevel>{edge.node.title}</SecondLevel>}
          </Link>
        ) : null
      )}
    </Animation>
  );
};

export default Menu;
