import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

const TagTemplate = ({ data }) => {
  const posts = data.wpTag.posts.nodes;
  const tagName = data.wpTag.name;

  return (
    <Layout isHomePage>
      <SEO title={tagName} />
      <Bio />
      <h1>{tagName}</h1>
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
                  <Image
                    className="post-image"
                    fixed={featuredImage.fixed}
                    alt={featuredImage.alt}
                    style={{ marginBottom: 50 }}
                  />
                )}
                <section className="post-excerpt" itemProp="description">
                  {parse(post.excerpt)}
                </section>
              </article>
            </li>
          );
        })}
      </ol>
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
