/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import {
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
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
          <Button className="blue p-p-0 w-100 my-1">
            <i className="pi pi-facebook p-px-2" />
            <span className="p-px-3">Facebook</span>
          </Button>
        </FacebookShareButton>
      </div>

      <div>
        <FacebookMessengerShareButton
          appId="1147993589050014"
          className="w-100"
          url={shareUrl}
        >
          <Button className="lightBlue p-p-0 w-100 my-1">
            <i>
              <FacebookMessengerIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Facebook</span>
          </Button>
        </FacebookMessengerShareButton>
      </div>

      <div>
        <TwitterShareButton className="w-100" title={title} url={shareUrl}>
          <Button className="twitter p-p-0 w-100 my-1">
            <i className="pi pi-twitter p-px-2" />
            <span className="p-px-3">Twitter</span>
          </Button>
        </TwitterShareButton>
      </div>

      <div>
        <TelegramShareButton className="w-100" title={title} url={shareUrl}>
          <Button className="telegram p-p-0 w-100 my-1">
            <i>
              <TelegramIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Telegram</span>
          </Button>
        </TelegramShareButton>
      </div>

      <div>
        <WhatsappShareButton
          className="w-100"
          separator=":: "
          title={title}
          url={shareUrl}
        >
          <Button className="whatsapp p-p-0 w-100 my-1">
            <i>
              <WhatsappIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Whatsapp</span>
          </Button>
        </WhatsappShareButton>
      </div>

      <div>
        <LinkedinShareButton className="w-100" url={shareUrl}>
          <Button className="linkedin p-p-0 w-100 my-1">
            <i>
              <LinkedinIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Linkedin</span>
          </Button>
        </LinkedinShareButton>
      </div>

      <div>
        <PinterestShareButton className="w-100" media={shareUrl} url={shareUrl}>
          <Button className="pinterest p-p-0 w-100 my-1">
            <i>
              <PinterestIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Pinterest</span>
          </Button>
        </PinterestShareButton>
      </div>

      <div>
        <VKShareButton className="w-100" image={shareUrl} url={shareUrl}>
          <Button className="vk p-p-0 w-100 my-1">
            <i>
              <VKIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">VK</span>
          </Button>
        </VKShareButton>
      </div>

      <div>
        <RedditShareButton
          className="w-100"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <Button className="reddit p-p-0 w-100 my-1">
            <i>
              <RedditIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Reddit</span>
          </Button>
        </RedditShareButton>
      </div>

      <div>
        <TumblrShareButton className="w-100" title={title} url={shareUrl}>
          <Button className="tumblr p-p-0 w-100 my-1">
            <i>
              <TumblrIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Tumblr</span>
          </Button>
        </TumblrShareButton>
      </div>

      <div>
        <EmailShareButton
          body="body"
          className="w-100"
          subject={title}
          url={shareUrl}
        >
          <Button className="email p-p-0 w-100 my-1">
            <i>
              <EmailIcon className="mx-2" round size="18px" />
            </i>
            <span className="p-px-3">Email</span>
          </Button>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default Share;
