import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useClipboard from "react-use-clipboard";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { OpenInNew, ShareOutlined } from "@material-ui/icons";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import {
  BookmarkIcon,
  BookmarkSlashFillIcon,
  ClippyIcon,
  GitForkIcon,
  LinkIcon,
} from "@primer/octicons-react";

import { createDrawing, getDrawing } from "../../../services/drawingsService";
import FavoritesContext from "../../../services/favoritesContext";
import { getCurrentUser } from "../../../services/userService";
import Share from "./share action/Share";
import AlertDialogSlide from "./share action/shareDialog";

const download = (dataurl: string, filename: string) => {
  const a = document.createElement("a");
  a.href = dataurl;
  a.setAttribute("download", filename);
  a.click();
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      "& .MuiSpeedDial-actions .MuiSpeedDialAction-staticTooltip .MuiSpeedDialAction-staticTooltipLabel":
        {
          width: "max-content !important",
        },
    },
  })
);

export default function SpeedDialTooltipOpen({
  emitOpen,
  emitClose,
  emitFavoriteAction,
  id,
  drawingNumber,
  dataUrl,
  shareUrl,
  history,
  basePath,
}: {
  emitOpen: () => void;
  emitClose: () => void;
  emitFavoriteAction: (isAdd: boolean) => void;
  id: string;
  drawingNumber: string | number;
  dataUrl: string;
  shareUrl: string;
  history: any;
  basePath: string;
}): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const favorites = useContext(FavoritesContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCopied, setCopied] = useClipboard(shareUrl);

  const handleOpen = () => {
    emitOpen();
    setOpen(true);
  };

  const handleClose = () => {
    emitClose();
    setOpen(false);
  };

  const actions = [
    {
      icon: <InfoOutlinedIcon />,
      name: "Info",
      handleAction: () => {
        history.push(`/${basePath}/${id}`);
      },
    },
    {
      icon: <GitForkIcon size={24} />,
      name: "Fork",
      handleAction: async () => {
        try {
          const { painter } = getCurrentUser() as any;

          if (!painter) {
            toast.error(
              <p className="text-center">
                Sorry, you need a `painter` account to fork a drawing. <br />
                Feel free to create your own and start creating!
              </p>,
              {
                position: "top-center",
                autoClose: 4000,
              }
            );
            return;
          }

          const {
            data: { grid, dataUrl: imageSrc, drawingName, description },
          }: any = await getDrawing(id);

          const forked = "...(forked)";

          const data: any = {
            drawingName: `${
              drawingName.replaceAll(forked, "").substring(0, 15) + forked
            }`,
            description: `${
              description.replaceAll(forked, "").substring(0, 214) + forked
            }`,
            grid,
            dataUrl: imageSrc,
          };

          const {
            data: { _id },
          } = await createDrawing(data);

          toast.success("Drawing Forked!", {
            position: "top-center",
            autoClose: 2500,
          });

          history.replace(`/edit/${_id}`);
        } catch (error) {
          toast.error(`Error(${error})`, {
            position: "top-center",
            autoClose: 2500,
          });
          throw new Error(error);
        }
      },
    },
    {
      icon: <ShareOutlined />,
      name: "Share",
      handleAction: () => {
        setOpenDialog(true);
      },
    },
    {
      icon: !favorites.includes(drawingNumber) ? (
        <BookmarkIcon size={24} />
      ) : (
        <BookmarkSlashFillIcon size={24} />
      ),
      name: !favorites.includes(drawingNumber)
        ? "Save to Favorites"
        : "Remove from Favorites",
      handleAction: () => {
        emitFavoriteAction(!favorites.includes(drawingNumber));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !favorites.includes(drawingNumber)
          ? toast.success("Saved to Favorites", { position: "top-center" })
          : toast.dark("Removed from Favorites", { position: "top-center" });
      },
    },
    {
      icon: <GetAppRoundedIcon />,
      name: "Download Image",
      handleAction: () => {
        download(dataUrl, `${id}.png`);
      },
    },
    {
      icon: <LinkIcon size={24} />,
      name: "Copy Image Link",
      handleAction: () => {
        setCopied();
        toast.success(
          <span>
            <ClippyIcon className="mr-5" size={24} /> Copied to Clipboard!
          </span>,
          { position: "top-center" }
        );
      },
    },
    {
      icon: <OpenInNew />,
      name: "Open in New Window",
      handleAction: () => {
        const image = new Image();
        const div = document.createElement("div");
        div.setAttribute(
          "style",
          "height:100%;display:grid;justify-content:center;align-content:center;"
        );
        image.src = dataUrl;
        div.appendChild(image);

        const w = window.open("");
        w?.document.write(div.outerHTML);
      },
    },
  ];

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        className={classes.speedDial}
        direction="up"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={() => {
              action.handleAction?.();
              handleClose();
            }}
            tooltipOpen
            tooltipPlacement="left"
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      {openDialog && (
        <AlertDialogSlide
          emitClose={() => setOpenDialog(false)}
          title="Choose an Option"
        >
          <Share shareUrl={shareUrl} />
        </AlertDialogSlide>
      )}
    </div>
  );
}
