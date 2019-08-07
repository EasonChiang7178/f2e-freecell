import { useStaticQuery, graphql } from "gatsby"

export const useBoardData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              board
            }
          }
        }
      }
    `
  )

  return data.allDataJson.edges.map(edge => edge.node.board)
}
