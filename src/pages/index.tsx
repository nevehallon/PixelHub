import loadable from "@loadable/component";

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

export default IndexPage;
