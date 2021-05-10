/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { Button } from "primereact/button";

import "./share.scss";

const Share = ({ shareUrl }: { shareUrl: string }): JSX.Element => {
  const title = "PaintHub";

  return (
    <div id="Share__container">
      <div>
        <FacebookShareButton className="w-100" quote={title} url={shareUrl}>
          <Button className="lightBlue p-0 w-100 my-1">
            <i>
              <FacebookIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Facebook</span>
          </Button>
        </FacebookShareButton>
      </div>
      <div>
        <FacebookMessengerShareButton
          appId="1147993589050014"
          className="w-100"
          url={shareUrl}
        >
          <Button className="x-lightBlue p-0 w-100 my-1">
            <i>
              <FacebookMessengerIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Messenger</span>
          </Button>
        </FacebookMessengerShareButton>
      </div>
      <div>
        <TwitterShareButton className="w-100" title={title} url={shareUrl}>
          <Button className="lightBlue p-0 w-100 my-1">
            <i>
              <TwitterIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Twitter</span> {/* TODO: debug share */}
          </Button>
        </TwitterShareButton>
      </div>

      <div>
        <WhatsappShareButton
          className="w-100"
          separator=":: "
          title={title}
          url={shareUrl}
        >
          <Button className="x-lightBlue p-0 w-100 my-1">
            <i>
              <WhatsappIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Whatsapp</span>
          </Button>
        </WhatsappShareButton>
      </div>

      <div>
        <TumblrShareButton className="w-100" title={title} url={shareUrl}>
          <Button className="lightBlue p-0 w-100 my-1">
            <i>
              <TumblrIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Tumblr</span>
          </Button>
        </TumblrShareButton>
      </div>
      <div>
        <EmailShareButton className="w-100" subject={title} url={shareUrl}>
          <Button className="yellow p-0 w-100 my-1">
            <i>
              <EmailIcon className="mx-2" round size="25px" />
            </i>
            <span className="px-3">Email</span>
          </Button>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default Share;
