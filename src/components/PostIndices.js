import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import styled from 'styled-components';
const NO_IMAGE = '../images/no-image-200x200.png';

const PostWrapper = styled.article`
  display: grid;
  grid-template:
    '... ...... ...... ......  ...' var(--spacing-2)
    '... header header header  ...'
    '... ...... ...... ......  ...' var(--spacing-2)
    '... image  ...... excerpt ...'
    '... ...... ...... ......  ...' var(--spacing-2)
    / var(--spacing-2) 150px var(--spacing-2) 1fr var(--spacing-2);
  border: 1px solid #ddd;
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
    max-width: 150px;
    min-width: 150px;
    max-height: 150px;
    min-width: 150px;
  }
`;

const PostExcerpt = styled.section`
  grid-area: excerpt;
  overflow: hidden;
`;

const PostIndices = ({ posts }) => (
  <ol style={{ listStyle: `none` }}>
    {posts.map(post => {
      const title = post.title;
      const featuredImage = {
        imageData:
          post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.altText || ``,
      };

      return (
        <li key={post.uri}>
          <PostWrapper itemScope itemType="http://schema.org/Article">
            <PostHeader>
              <h2>
                <Link to={post.uri} itemProp="url">
                  <span itemProp="headline">{parse(title)}</span>
                </Link>
              </h2>
              <small>{post.date}</small>
            </PostHeader>
            {featuredImage?.imageData && (
              <ImageWrapper>
                <Link to={post.uri} itemProp="url">
                  <GatsbyImage
                    image={featuredImage.imageData}
                    className="post-image"
                    alt={featuredImage.alt}
                  />
                </Link>
              </ImageWrapper>
            )}
            {!!featuredImage?.imageData || (
              <ImageWrapper>
                <StaticImage src={NO_IMAGE} alt="Nothing" />
              </ImageWrapper>
            )}
            <PostExcerpt itemProp="description">
              {parse(post.excerpt)}
            </PostExcerpt>
          </PostWrapper>
        </li>
      );
    })}
  </ol>
);

export default PostIndices;
