import React from 'react';
import { graphql } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import PostIndices from '../components/PostIndices';
import { Button, ButtonsWrapper } from '../components/Button';

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes;

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="全投稿" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    );
  }

  return (
    <Layout isHomePage>
      <Seo title="全投稿" />
      <PostIndices posts={posts} />
      <ButtonsWrapper>
        {previousPagePath && (
          <>
            <Button to={previousPagePath}>前のページ</Button>
            <br />
          </>
        )}
        {nextPagePath && <Button to={nextPagePath}>次のページ</Button>}
      </ButtonsWrapper>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        uri
        date(formatString: "YYYY-MM-DD")
        title
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
`;
