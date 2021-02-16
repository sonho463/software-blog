import React from "react"
import Layout from "../components/layout"

const PageTemplate = ({ data }) => (
  <Layout>
    <h1 dangerouslySetInnerHTML={{__html: data.wpPage.title}}/>
    <div dangerouslySetInnerHTML={{__html: data.wpPage.content}}/>
  </Layout>
)

export default PageTemplate

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: {eq: $id}) {
      id
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 4000) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
