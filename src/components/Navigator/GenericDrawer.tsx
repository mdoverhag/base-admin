import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import { useIsMobileSize } from "lib/hooks";

interface GenericDrawerProps {
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (value: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
      backgroundColor: theme.palette.background.default,
    },
  })
);

const GenericDrawer: React.FC<GenericDrawerProps> = ({
  children,
  mobileDrawerOpen,
  setMobileDrawerOpen,
}) => {
  const isMobileSize = useIsMobileSize();
  const classes = useStyles();
  if (isMobileSize) {
    return (
      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {children}
      </Drawer>
    );
  } else {
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {children}
      </Drawer>
    );
  }
};

export default GenericDrawer;
