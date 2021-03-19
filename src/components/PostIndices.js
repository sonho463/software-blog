import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';
import NoImage from '../images/no-image-200x200.png';
import styled from 'styled-components';

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
        fixed: post.featuredImage?.node?.localFile?.childImageSharp?.fixed,
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
            {featuredImage?.fixed && (
              <ImageWrapper>
                <Link to={post.uri} itemProp="url">
                  <Image
                    className="post-image"
                    fixed={featuredImage.fixed}
                    alt={featuredImage.alt}
                    style={{ marginBottom: 50 }}
                  />
                </Link>
              </ImageWrapper>
            )}
            {!!featuredImage?.fixed || (
              <ImageWrapper>
                <img src={NoImage} alt="Nothing" />
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
