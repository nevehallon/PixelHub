import React from "react";

import PageHeader from "../../common/pageHeader";

const About = (): any => (
  <div className="container">
    <PageHeader titleText="About PixelHub" />
    {/*           ${(<i className="fas fa-paint-brush"></i>)}  */}
    <div className="row pt-5">
      <div className="col-12">
        <h4>CREATE AND SHARE PIXEL ART</h4>
        <p>
          <q cite="https://en.wikipedia.org/wiki/Pixel_art">
            Pixel art is a form of digital art, created through the use of
            software, where images are edited on the pixel level. The aesthetic
            for this kind of graphics comes from 8-bit and 16-bit computers and
            video game consoles, in addition to other limited systems such as
            graphing calculators. In most pixel art, the color palette used is
            extremely limited in size, with some pixel art using only two
            colors.
          </q>
          <a
            href="https://en.wikipedia.org/wiki/Pixel_art"
            style={{ color: "aquamarine" }}
          >
            - Wikipedia
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default About;
