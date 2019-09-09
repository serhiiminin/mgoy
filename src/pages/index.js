import React from "react"
import Layout from "../components/layout"
import DebtorsList from "../components/debtors-list"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Money guys owe you</h1>
    <DebtorsList />
  </Layout>
)

export default IndexPage
