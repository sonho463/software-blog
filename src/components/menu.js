import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { slide as Animation } from 'react-burger-menu';

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
              ? edge.node.title
              : '　' + edge.node.title}
          </Link>
        ) : null
      )}
    </Animation>
  );
};

export default Menu;
