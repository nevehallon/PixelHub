import loadable from "@loadable/component";
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

// import Layout from "../components/layout"
// import SEO from "../components/seo"

const AppIndex = loadable(() => import("../port/index"), {
  fallback: <div>Loading...</div>,
});

const IndexPage = (): JSX.Element => (
  <div>
    {
      // JS interpolation
      typeof window !== "undefined" &&
        // if window does not exist (its type undefined),
        // we stop here (since this will be `false` and render nothing)
        AppIndex && (
          // AppIndex also can be undefined (because of the special loader for html)
          // we don't want that to render either, so we will add a condition
          // if it's undefined, it's falsy so it renders `undefined` (nothing)
          <AppIndex />
        )
      // finally if the two earlier conditions are truthy, let's render!
    }
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
