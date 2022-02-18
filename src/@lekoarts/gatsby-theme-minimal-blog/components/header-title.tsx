/** @jsx jsx */
import { Link } from "gatsby"
import { useColorMode, jsx } from "theme-ui"
import replaceSlashes from "../utils/replaceSlashes"
import useSiteMetadata from "../hooks/use-site-metadata"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import img from "../../../../static/android-chrome-192x192.png"
import imgInv from "../../../../static/android-chrome-192x192-inv.png"
import { keyframes } from "@emotion/react"

const rotate = keyframes({
  from: { 
    transform: `rotate(0deg)`
  },
  to: { 
    transform: `rotate(359deg)`
  }
})

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata()
  const { basePath } = useMinimalBlogConfig()

  const [colorMode, setColorMode] = useColorMode()

  return (
      <Link
        to={replaceSlashes(`/${basePath}`)}
        aria-label={`${siteTitle} - Back to home`}
        sx={{ color: `heading`, textDecoration: `none`, display: `flex`, alignItems: `center` }}
      >
        <div sx={{ my: 0, fontWeight: `medium`, fontSize: [3, 4] }}>{siteTitle}</div>
        <img src={colorMode === `dark` ? imgInv : img} height={32} sx={{ marginLeft: `0.75rem`, animation: `${rotate} 15s infinite linear` }} />
      </Link>
      
  )
}

export default HeaderTitle