import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { TagCloud as ReactTagCould } from 'react-tagcloud';
import { navigate } from '@reach/router';

const TagCloudWrapper = styled.div`
  border: 1px solid #ddd;
  margin-top: 1em;
  padding: 0.5em;
  .simple-cloud .tag-cloud-tag {
    cursor: pointer;
    &:hover {
      text-shadow: 2px 2px 3px #f4bad3, -2px -2px 3px #ffee7f;
    }
  }
`;

const Title = styled.div`
  font-size: var(--fontSize-3);
  font-weight: bold;
  margin-top: var(--spacing-3);
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
    <>
      <Title>タグ</Title>
      <TagCloudWrapper>
        <ReactTagCould
          className="simple-cloud"
          minSize={12}
          maxSize={35}
          tags={data}
          onClick={tag => navigate(tag.uri)}
        />
      </TagCloudWrapper>
    </>
  );
};

export default TagCloud;
