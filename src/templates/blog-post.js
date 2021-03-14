import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Button } from '../components/Button';
import styled from 'styled-components';

const PostWrapper = styled.article`
  display: grid;
  grid-template:
    '... ......  ......  ......  ...' var(--spacing-2)
    '... header  header  header  ...'
    '... ...... ...... ......  ...' var(--spacing-2)
    '... image   ......  ......  ...' 200px
    '... ......  ......  ......  ...' var(--spacing-2)
    '... content content content ...'
    '... ......  ......  ......  ...' var(--spacing-2)
    '... buttons buttons buttons ...'
    '... ......  ......  ......  ...' var(--spacing-2)
    / var(--spacing-2) 200px var(--spacing-2) 1fr var(--spacing-2);
  border: 1px solid #ddd;
}
`;

const PostHeader = styled.header`
  grid-area: header;
  font-family: var(--font-heading);
  font-size: var(--fontSize-4);
  span {
    color: var(--color-primary);
  }
  small {
    font-size: var(--fontSize-2);
  }
`;

const ImageWrapper = styled.div`
  grid-area: image;
  img {
    max-width: 200px;
    min-width: 200px;
    max-height: 200px;
    min-width: 200px;
  }
`;

const ContentWrapper = styled.section`
  grid-area: content;
`;

const ButtonsWrapper = styled.nav`
  grid-area: buttons;
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-2);

  >: first-child {
    height: auto;
    flex-grow: 1;
    font-size: 0.8em;
    ::before {
      content: '<< ';
      font-size: 1.2em;
      font-weight: bold;
    }
  }
  > :last-child {
    height: auto;
    flex-grow: 1;
    font-size: 0.8em;
    ::after {
      content: ' >>';
      font-size: 1.2em;
      font-weight: bold;
    }
  }
`;

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.altText || ``,
  };

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />

      <PostWrapper itemScope itemType="http://schema.org/Article">
        <PostHeader>
          <div>
            <span itemProp="headline">{parse(post.title)}</span>
          </div>
          <small>{post.date}</small>
        </PostHeader>
        {/* if we have a featured image for this post let's display it */}
        {featuredImage?.fluid && (
          <ImageWrapper>
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          </ImageWrapper>
        )}

        {!!post.content && (
          <ContentWrapper itemProp="articleBody">
            {parse(post.content)}
          </ContentWrapper>
        )}
        <ButtonsWrapper>
          {previous && (
            <Button to={previous.uri} rel="prev">
              {parse(previous.title)}
            </Button>
          )}
          {next && (
            <Button to={next.uri} rel="next">
              {parse(next.title)}
            </Button>
          )}
        </ButtonsWrapper>
      </PostWrapper>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "YYYY-MM-DD")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
