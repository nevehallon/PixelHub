// import * as React from "react"
import React, { Suspense } from "react";

import { lazy } from "@loadable/component";
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

// import Layout from "../components/layout"
// import SEO from "../components/seo"

const AppIndex = lazy(() => import("../port/index"));

const IndexPage = (): JSX.Element => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <AppIndex />
    </Suspense>
  </div>
);

/* <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout> */

export default IndexPage;
