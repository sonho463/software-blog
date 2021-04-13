import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import PostIndices from '../components/PostIndices';

const TagTemplate = ({ data }) => {
  const posts = data.wpTag.posts.nodes;
  const tagName = data.wpTag.name;

  return (
    <Layout isHomePage>
      <Seo title={tagName} />
      <h1>{tagName}</h1>
      <PostIndices posts={posts} />
    </Layout>
  );
};

export default TagTemplate;

export const tagQuery = graphql`
  query PostArchivegByTagId($id: String!) {
    wpTag(id: { eq: $id }) {
      name
      posts {
        nodes {
          id
          uri
          title
          date(formatString: "YYYY-MM-DD")
          excerpt
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 200
                    layout: FIXED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
