import { Drawer } from '@mui/material';
import { ReactNode } from 'react';

interface DrawerWrapperProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
  children: ReactNode;
}

export const DrawerWrapper = ({ open, setOpen, children, headerHeight }: DrawerWrapperProps) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={() => setOpen(false)}
      hideBackdrop
      sx={{ top: `${headerHeight}px` }}
      PaperProps={{
        sx: {
          background: '#ffffff',
          // backdropFilter: 'blur(5px)',
          boxShadow: 'none',
          borderRadius: 'unset',
          width: '100%',
          top: `${headerHeight}px`,
          pt: 2,
          pb: 15,
          minHeight: '100vh',
        },
      }}
    >
      {children}
    </Drawer>
  );
};
