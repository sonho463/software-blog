import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { slide as Animation } from "react-burger-menu"

const Menu = () => {
  const data = useStaticQuery(graphql`
    {
      allWpPage {
        edges {
          node {
            status
            title
            uri
          }
        }
      }
    }
  `)

  return (
    <Animation width={460}>
      {data.allWpPage.edges.map(edge => {
        if (edge.node.status === "publish") {
          return (
            <Link to={edge.node.uri} className="menu-item" key={edge.node.uri}>
              {edge.node.title}
            </Link>
          )
        }
      })}
    </Animation>
  )
}

export default Menu
