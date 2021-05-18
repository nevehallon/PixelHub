import { forwardRef, ReactElement, Ref, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = forwardRef(
  (
    // eslint-disable-next-line react/require-default-props
    props: TransitionProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const AlertDialogSlide = ({
  title,
  emitClose,
  children,
}: {
  emitClose: () => void;
  title: string;
  children: JSX.Element;
}): JSX.Element => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      emitClose();
    }, 150);
  };

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        keepMounted
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions />
      </Dialog>
    </div>
  );
};

export default AlertDialogSlide;
