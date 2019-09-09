import React from "react"
import PropTypes from "prop-types"
import "./layout.css"

const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <footer>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a
        href="https://twitter.com/serhiiminin"
        target="_blank"
        rel="noopener noreferrer"
      >
        Serhii Minin
      </a>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
