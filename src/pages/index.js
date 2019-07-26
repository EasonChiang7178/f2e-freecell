import React from "react"

import { ImageDataProvider } from '../contexts/ImageDataContext'

import SEO from "../layouts/SEO"
import GlobalStyles from "../layouts/GlobalStyles"
import FreeCellBoard from "../components/FreeCellBoard"

export default ({ data }) => (
  <ImageDataProvider imageData={data}>
    <SEO title="Retro Free Cell" />
    <GlobalStyles />

    <FreeCellBoard />
  </ImageDataProvider>
)

export const query = graphql`
  query {
    club_a: file(relativePath: { eq: "cards/club_a.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_2: file(relativePath: { eq: "cards/club_2.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_3: file(relativePath: { eq: "cards/club_3.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_4: file(relativePath: { eq: "cards/club_4.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_5: file(relativePath: { eq: "cards/club_5.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_6: file(relativePath: { eq: "cards/club_6.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_7: file(relativePath: { eq: "cards/club_7.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_8: file(relativePath: { eq: "cards/club_8.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_9: file(relativePath: { eq: "cards/club_9.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_10: file(relativePath: { eq: "cards/club_10.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_j: file(relativePath: { eq: "cards/club_j.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_q: file(relativePath: { eq: "cards/club_q.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_k: file(relativePath: { eq: "cards/club_k.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_a: file(relativePath: { eq: "cards/diamond_a.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_2: file(relativePath: { eq: "cards/diamond_2.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_3: file(relativePath: { eq: "cards/diamond_3.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_4: file(relativePath: { eq: "cards/diamond_4.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_5: file(relativePath: { eq: "cards/diamond_5.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_6: file(relativePath: { eq: "cards/diamond_6.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_7: file(relativePath: { eq: "cards/diamond_7.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_8: file(relativePath: { eq: "cards/diamond_8.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_9: file(relativePath: { eq: "cards/diamond_9.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_10: file(relativePath: { eq: "cards/diamond_10.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_j: file(relativePath: { eq: "cards/diamond_j.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_q: file(relativePath: { eq: "cards/diamond_q.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    diamond_k: file(relativePath: { eq: "cards/diamond_k.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_a: file(relativePath: { eq: "cards/heart_a.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_2: file(relativePath: { eq: "cards/heart_2.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_3: file(relativePath: { eq: "cards/heart_3.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_4: file(relativePath: { eq: "cards/heart_4.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_5: file(relativePath: { eq: "cards/heart_5.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_6: file(relativePath: { eq: "cards/heart_6.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_7: file(relativePath: { eq: "cards/heart_7.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_8: file(relativePath: { eq: "cards/heart_8.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_9: file(relativePath: { eq: "cards/heart_9.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_10: file(relativePath: { eq: "cards/heart_10.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_j: file(relativePath: { eq: "cards/heart_j.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_q: file(relativePath: { eq: "cards/heart_q.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    heart_k: file(relativePath: { eq: "cards/heart_k.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_a: file(relativePath: { eq: "cards/spade_a.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_2: file(relativePath: { eq: "cards/spade_2.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_3: file(relativePath: { eq: "cards/spade_3.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_4: file(relativePath: { eq: "cards/spade_4.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_5: file(relativePath: { eq: "cards/spade_5.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_6: file(relativePath: { eq: "cards/spade_6.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_7: file(relativePath: { eq: "cards/spade_7.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_8: file(relativePath: { eq: "cards/spade_8.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_9: file(relativePath: { eq: "cards/spade_9.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_10: file(relativePath: { eq: "cards/spade_10.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_j: file(relativePath: { eq: "cards/spade_j.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_q: file(relativePath: { eq: "cards/spade_q.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    spade_k: file(relativePath: { eq: "cards/spade_k.png" }) {
      childImageSharp { fixed(width: 200) { ...GatsbyImageSharpFixed } }
    }
    club_watermark: file(relativePath: { eq: "img_watermark_club.png" }) {
      childImageSharp { fixed(width: 120) { ...GatsbyImageSharpFixed } }
    }
    diamond_watermark: file(relativePath: { eq: "img_watermark_diamond.png" }) {
      childImageSharp { fixed(width: 120) { ...GatsbyImageSharpFixed } }
    }
    heart_watermark: file(relativePath: { eq: "img_watermark_heart.png" }) {
      childImageSharp { fixed(width: 120) { ...GatsbyImageSharpFixed } }
    }
    spade_watermark: file(relativePath: { eq: "img_watermark_spade.png" }) {
      childImageSharp { fixed(width: 120) { ...GatsbyImageSharpFixed } }
    }
  }
`
