import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { TagCloud as ReactTagCould } from 'react-tagcloud';
import { navigate } from '@reach/router';

const TagCloudWrapper = styled.div`
  border: 1px solid #ddd;
  margin-top: 1em;
  padding: 0.5em;
`;

const TagCloud = () => {
  const wpData = useStaticQuery(graphql`
    {
      allWpTag {
        nodes {
          uri
          name
          count
          posts {
            nodes {
              uri
              title
            }
          }
        }
      }
    }
  `);

  // Ex. { value: 'JavaScript', count: 38 }
  const data = wpData.allWpTag.nodes.map(tag => ({
    value: tag.name,
    count: tag.count,
    uri: tag.uri,
  }));

  return (
    <TagCloudWrapper>
      <ReactTagCould
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={tag => navigate(tag.uri)}
      />
    </TagCloudWrapper>
  );
};

export default TagCloud;
