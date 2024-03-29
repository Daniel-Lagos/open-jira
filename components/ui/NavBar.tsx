import { FC, useContext } from 'react';
import NexLink from 'next/link';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { UIContext } from '../../context/ui';

export const NavBar: FC = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position={'sticky'} elevation={0}>
      <Toolbar>
        <IconButton size={'large'} edge={'start'} onClick={openSideMenu}>
          <MenuOutlined/>
        </IconButton>
        <NexLink href={'/'} passHref>
          <Link underline={'none'} color={'white'}>
            <Typography variant={'h6'}>OpenJira</Typography>
          </Link>
        </NexLink>
      </Toolbar>
    </AppBar>
  );
};
