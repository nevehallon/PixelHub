import { useEffect } from "react";
import { Helmet } from "react-helmet";

import { StringParam, useQueryParam } from "use-query-params";

import src from "../images/gatsby-astronaut.png";

const metaImageUrl =
  "https://og-image-navy-iota.vercel.app/%20?heights=1000&images=";

function PublicImages(): JSX.Element {
  const [data, setData] = useQueryParam("data", StringParam);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    setData(new URLSearchParams(location.search).get("data"));
  }, [setData]);

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
        <meta
          content={metaImageUrl + encodeURIComponent(data as string)}
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="title" name="twitter:title" />
        <meta content="description" name="twitter:description" />
        <meta
          content={metaImageUrl + encodeURIComponent(data as string)}
          name="twitter:image"
        />
      </Helmet>
      {data && (
        <img
          alt="drawing"
          src={metaImageUrl + encodeURIComponent(data as string)}
          style={{
            background: "#fff",
          }}
        />
      )}
    </div>
  );
}

export default PublicImages;
