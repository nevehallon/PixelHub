import { Helmet } from "react-helmet";

import { StringParam, useQueryParam } from "use-query-params";

import src from "../images/gatsby-astronaut.png";

function PublicImages(): JSX.Element {
  const [data, setData] = useQueryParam("data", StringParam);
  // const query = useQuery();

  // const src = query.get('data');
  const metaImageUrl =
    "https://og-image-navy-iota.vercel.app/%20?heights=1000&images=";

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Helmet>
        <html lang="en" />
        <title>title</title>
        <meta content="description" name="description" />
        <meta content="title" property="og:site_name" />
        <meta content={metaImageUrl} property="og:image" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="title" name="twitter:title" />
        <meta content="description" name="twitter:description" />
        <meta content={metaImageUrl} name="twitter:image" />
      </Helmet>
      <img
        alt="drawing"
        src={metaImageUrl + encodeURIComponent(data as string)}
        style={{
          background: "#fff",
        }}
      />
    </div>
  );
}

export default PublicImages;
