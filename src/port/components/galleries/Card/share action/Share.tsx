/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import {
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { Button } from "primereact/button";

import "primeflex/primeflex.css";
import "./share.scss";

const Share = ({ shareUrl }: { shareUrl: string }): JSX.Element => {
  const title = "PaintHub";

  return (
    <div className="Share__container">
      <div className="Share__some-network">
        <FacebookShareButton quote={title} url={shareUrl}>
          <Button className="facebook p-p-0">
            <i className="pi pi-facebook p-px-2" />
            <span className="p-px-3">Facebook</span>
          </Button>
        </FacebookShareButton>

        <div>
          <FacebookShareCount url={shareUrl}>
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>

      <div className="Share__some-network">
        <FacebookMessengerShareButton
          appId="521270401588372"
          className="Share__some-network__share-button"
          url={shareUrl}
        >
          <Button className="facebook p-p-0" icon={FacebookMessengerIcon}>
            <span className="p-px-3">Facebook</span>
          </Button>
        </FacebookMessengerShareButton>
      </div>

      <div className="Share__some-network">
        <TwitterShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <Button className="twitter p-p-0">
            <i className="pi pi-twitter p-px-2" />
            <span className="p-px-3">Twitter</span>
          </Button>
        </TwitterShareButton>
      </div>

      <div className="Share__some-network">
        <TelegramShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <Button className="telegram p-p-0" icon={TelegramIcon}>
            <span className="p-px-3">Telegram</span>
          </Button>
        </TelegramShareButton>
      </div>

      <div className="Share__some-network">
        <WhatsappShareButton
          className="Share__some-network__share-button"
          separator=":: "
          title={title}
          url={shareUrl}
        >
          <Button className="whatsapp p-p-0" icon={WhatsappIcon}>
            <span className="p-px-3">Whatsapp</span>
          </Button>
        </WhatsappShareButton>
      </div>

      <div className="Share__some-network">
        <LinkedinShareButton
          className="Share__some-network__share-button"
          url={shareUrl}
        >
          <Button className="linkedin p-p-0" icon={LinkedinIcon}>
            <span className="p-px-3">Linkedin</span>
          </Button>
        </LinkedinShareButton>
      </div>

      <div className="Share__some-network">
        <PinterestShareButton
          className="Share__some-network__share-button"
          media={shareUrl}
          url={shareUrl}
        >
          <Button className="pinterest p-p-0" icon={PinterestIcon}>
            <span className="p-px-3">Pinterest</span>
          </Button>
        </PinterestShareButton>

        <div>
          <PinterestShareCount url={shareUrl} />
        </div>
      </div>

      <div className="Share__some-network">
        <VKShareButton
          className="Share__some-network__share-button"
          image={shareUrl}
          url={shareUrl}
        >
          <Button className="vk p-p-0" icon={VKIcon}>
            <span className="p-px-3">VK</span>
          </Button>
        </VKShareButton>

        <div>
          <VKShareCount url={shareUrl} />
        </div>
      </div>

      <div className="Share__some-network">
        <RedditShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <Button className="reddit p-p-0" icon={RedditIcon}>
            <span className="p-px-3">Reddit</span>
          </Button>
        </RedditShareButton>

        <div>
          <RedditShareCount url={shareUrl} />
        </div>
      </div>

      <div className="Share__some-network">
        <TumblrShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <Button className="tumblr p-p-0" icon={TumblrIcon}>
            <span className="p-px-3">Tumblr</span>
          </Button>
        </TumblrShareButton>

        <div>
          <TumblrShareCount url={shareUrl} />
        </div>
      </div>

      <div className="Share__some-network">
        <EmailShareButton
          body="body"
          className="Share__some-network__share-button"
          subject={title}
          url={shareUrl}
        >
          <Button className="email p-p-0" icon={EmailIcon}>
            <span className="p-px-3">Email</span>
          </Button>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default Share;
