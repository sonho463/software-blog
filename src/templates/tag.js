import React from 'react';
import { graphql } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostIndices from '../components/PostIndices';

const TagTemplate = ({ data }) => {
  const posts = data.wpTag.posts.nodes;
  const tagName = data.wpTag.name;

  return (
    <Layout isHomePage>
      <SEO title={tagName} />
      <Bio />
      <h1>{tagName}</h1>
      <PostIndices posts={posts}/>
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
                  fixed(width: 200) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
