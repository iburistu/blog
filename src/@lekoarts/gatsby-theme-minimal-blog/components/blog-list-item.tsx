/** @jsx jsx */
import * as React from "react"
import { jsx, Link as TLink, Box } from "theme-ui"
import { Link } from "gatsby"
import ItemTags from "./item-tags"

type BlogListItemProps = {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }
  showTags?: boolean
}

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <Box mb={4}>
    <TLink as={Link} to={post.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
      {post.title}
    </TLink>
    <p sx={{ color: `secondary`, mt: 1, mb: 0, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      <time>{post.date}</time>
      {post.tags && showTags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </p>
    <span sx={{ color: `secondary`, mt: 0, fontSize: [1] }}>
      {post.description ?? ''}
    </span>
    <p sx={{ color: `secondary`, mt: 1, fontSize: [0], fontStyle: `italic` }}>
      {post.excerpt ?? ''}
    </p>
  </Box>
)

export default BlogListItem