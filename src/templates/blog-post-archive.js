import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Button, ButtonsWrapper } from '../components/Button';

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes;

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <SEO title="全投稿" />
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
      <SEO title="全投稿" />

      <Bio />

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
`;
