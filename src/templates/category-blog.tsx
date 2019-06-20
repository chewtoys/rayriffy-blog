import React from 'react'
import Helmet from 'react-helmet'

import filter from 'lodash/filter'
import head from 'lodash/head'

import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { Box, Flex } from 'rebass'

import { Chip } from '../components/chip'
import Card from '../components/new/card'
import Pagination from '../components/new/pagination'

interface IAuthor {
  node: {
    user: string
    name: string
    facebook: string
  }
}

interface PropsInterface {
  location: object
  pageContext: {
    currentPage: number
    numPages: number
    pathPrefix: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
        author: string
        fbApp: string
      }
    }
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          excerpt: string
          fields: {
            slug: string
          }
          frontmatter: {
            date: string
            title: string
            subtitle: string
            featured: boolean
            author: string
            banner: {
              childImageSharp: {
                fluid: FluidObject
              }
            }
          }
        }
      }[]
    }
    allAuthorsJson: {
      edges: IAuthor[]
    }
    categoriesJson: {
      name: string
      desc: string
    }
  }
}

const CategoryBlog: React.SFC<PropsInterface> = props => {
  const authors = props.data.allAuthorsJson.edges
  const posts = props.data.allMarkdownRemark.edges
  const categoryName = props.data.categoriesJson.name
  const categoryDescription = props.data.categoriesJson.desc

  const {currentPage, numPages, pathPrefix} = props.pageContext

  return (
    <>
      <Helmet title={categoryName} />
      <Chip name={categoryName} desc={categoryDescription} />
      <Box>
        <Flex justifyContent={`center`}>
          <Box width={[22/24, 22/24, 20/24, 18/24]}>
            <Flex flexWrap={`wrap`}>
              {posts.map(post => {
                const {fields, frontmatter} = post.node
                const {slug} = fields
                const {author} = frontmatter

                const fetchedAuthor: IAuthor | any = head(filter(authors, (o: IAuthor) => o.node.user === author))

                return (
                  <Box width={[1, 1, 1/2, 1/2]} p={3} key={`listing-${currentPage}-${slug}`}>
                    <Card key={slug} slug={slug} author={fetchedAuthor.node} blog={frontmatter} type={`listing`} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Pagination numPages={numPages} currentPage={currentPage} pathPrefix={pathPrefix} />
    </>
  )
}

export default CategoryBlog

export const pageQuery = graphql`
  query CategoryPage($category: String!, $limit: Int!, $regex: String!, $skip: Int!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {regex: $regex}}}
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
            status
            featured
            author
            banner {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 90) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
        }
      }
    }
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
    categoriesJson(key: {eq: $category}) {
      name
      desc
    }
  }
`
