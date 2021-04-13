import { Helmet } from "react-helmet";

import { StringParam, useQueryParam } from "use-query-params";

import src from "../images/gatsby-astronaut.png";

const metaImageUrl = "https://og-image-navy-iota.vercel.app/%20?images=";

const encodedUri = (x: any) => encodeURIComponent(x as string);

function PublicImages(): JSX.Element | null {
  const [data, setData] = useQueryParam("data", StringParam);

  // useEffect(() => {
  //   // eslint-disable-next-line no-restricted-globals
  //   setData(new URLSearchParams(location.search).get("data"));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log();

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
          content={`${metaImageUrl}${encodedUri(data)}`}
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="title" name="twitter:title" />
        <meta content="description" name="twitter:description" />
        <meta
          content={`${metaImageUrl}${encodedUri(data)}`}
          name="twitter:image"
        />
      </Helmet>
      <img
        alt="drawing"
        src={data as string}
        style={{
          width: "100%",
          background: "#fff",
        }}
      />
    </div>
  );
}

export default PublicImages;
