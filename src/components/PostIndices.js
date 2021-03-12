import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';
import NoImage from '../images/no-image-200x200.png';

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
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="post-header">
              <h2>
                <Link to={post.uri} itemProp="url">
                  <span itemProp="headline">{parse(title)}</span>
                </Link>
              </h2>
              <small>{post.date}</small>
            </header>
            {featuredImage?.fixed && (
              <Link to={post.uri} itemProp="url">
                <Image
                  className="post-image"
                  fixed={featuredImage.fixed}
                  alt={featuredImage.alt}
                  style={{ marginBottom: 50 }}
                />
              </Link>
            )}
            {!!featuredImage?.fixed || (
              <img className="post-image" src={NoImage} alt="Nothing" />
            )}
            <section className="post-excerpt" itemProp="description">
              {parse(post.excerpt)}
            </section>
          </article>
        </li>
      );
    })}
  </ol>
);

export default PostIndices;
