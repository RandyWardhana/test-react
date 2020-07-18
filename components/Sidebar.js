import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar, Divider, Drawer, Collapse, Badge,
  Hidden, IconButton, List, ListItem, Button,
  ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'
import {
  Home, ArrowForwardIos, Menu, ExitToApp,
  AccountCircle, Notifications
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  headerDrawerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageContainer: {
    alignSelf: 'center',
    display: 'flex',
    margin: '0 4px',
    objectFit: 'cover',
  },
  drawerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  appBar: {
    backgroundColor: '#fafafa',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconBar: {
    minWidth: 32
  },
  menuText: {
    marginLeft: 12
  },
  openMenu: {
    minWidth: 0,
    marginRight: -8
  },
  notificationContainer: {
    borderRadius: 20,
    height: 40,
    minWidth: 20,
    position: 'absolute',
    right: 16,
    top: 80
  },
  logoImage: {
    width: '100%'
  },
  profileContainer: {
    margin: '16px 0'
  },
  accountIcon: {
    fontSize: 56
  },
  text: {
    color: '#4a4a4a'
  }
}))

function Sidebar(props) {
  const { window } = props
  const classes = useStyles()
  const route = useRouter()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openCollapseParent, setOpenCollapseParent] = React.useState(false)
  const [openCollapseChild, setOpenCollapseChild] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(11)

  const [listAppbar] = React.useState([
    { value: 'Halaman Utama', icon: <Home />, expand: false },
    { value: 'Human Capital', icon: <Home />, expand: true },
    { value: 'Legal & Compliance', icon: <Home />, expand: true },
    { value: 'Pembangunan', icon: <Home />, expand: true },
    { value: 'Keuangan', icon: <Home />, expand: true },
    { value: 'Teknik', icon: <Home />, expand: true },
    { value: 'Tanah', icon: <Home />, expand: true },
    { value: 'SMK3L', icon: <Home />, expand: false },
    { value: 'Humas', icon: <Home />, expand: true },
    { value: 'Master Data Pengguna', icon: <Home />, expand: true },
    { value: 'Manajemen Karyawan', icon: <Home />, expand: true },
    { value: 'Pengaturan Pengguna', icon: <Home />, expand: true },
    { value: 'Keluar', icon: <ExitToApp />, expand: false },
  ])

  const logout = () => {
    localStorage.setItem('token', '')
    route.push('/')
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <div style={{ textAlign: 'center' }}>
        <div className={classes.headerDrawerContainer}>
          <div className={classes.imageContainer} style={{ width: 50 }}>
            <img src='/logo.jpg' className={classes.logoImage} />
          </div>
          <div className={classes.imageContainer} style={{ width: 150 }}>
            <img src='/trans-sumatera.png' className={classes.logoImage} />
          </div>
        </div>
        <div className={classes.profileContainer}>
          <AccountCircle className={classes.accountIcon} />
          <Typography className={classes.text} style={{ fontWeight: 'bold' }}>Novi Aprilianti</Typography>
          <Typography variant='inherit' className={classes.text}>Ubah Profil</Typography>
          <Button className={classes.notificationContainer}>
            <Badge color='secondary' variant='dot'>
              <Notifications />
            </Badge>
          </Button>
        </div>
        <Divider />
      </div>
      <div className={classes.drawerContainer}>
        <List>
          {listAppbar.map((item, index) => listAppbar.length - 1 !== index && (
            <>
              <ListItem
                button
                onClick={() => { selectedIndex === index && setOpenCollapseParent(!openCollapseParent) }}
                selected={selectedIndex === index}
                key={index}
                style={{ borderLeft: selectedIndex == index ? '4px solid red' : '4px solid transparent', padding: 16 }}>
                <ListItemIcon className={classes.iconBar} style={{ color: selectedIndex == index ? 'red' : '#4a4a4a', fontSize: 12 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.value} style={{ color: selectedIndex == index ? 'red' : '#4a4a4a', fontSize: 12 }} />
                <ListItemIcon className={classes.openMenu} style={{ color: selectedIndex == index ? 'red' : '#4a4a4a', fontSize: 12 }}>{item.expand && <ArrowForwardIos fontSize={'small'} />}</ListItemIcon>
              </ListItem>
              {/* {openCollapseParent ? <ExpandLess /> : <ExpandMore />} */}
              {selectedIndex == index && openCollapseParent && (
                <Collapse in={openCollapseParent} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText style={{ marginLeft: 16 }} primary="Menu" />
                    </ListItem>
                    <ListItem button onClick={() => setOpenCollapseChild(!openCollapseChild)}>
                      <ListItemText style={{ marginLeft: 16 }} primary="Role Management" />
                      <ListItemIcon className={classes.openMenu} style={{ fontSize: 12 }}><ArrowForwardIos fontSize={'small'} /></ListItemIcon>
                    </ListItem>

                    {openCollapseChild && (
                      <>
                        <ListItem button>
                          <Link href='/settings/roles/hierarchy-structure'>
                            <ListItemText style={{ marginLeft: 32 }} primary="Hierarchy Structure" />
                          </Link>
                        </ListItem>
                        <ListItem button>
                          <Link href='#'>
                            <ListItemText style={{ marginLeft: 32 }} primary="Group Permission" />
                          </Link>
                        </ListItem>
                        <ListItem button>
                          <Link href='#'>
                            <ListItemText style={{ marginLeft: 32 }} primary="User Permission" />
                          </Link>
                        </ListItem>
                      </>
                    )}
                  </List>
                </Collapse>
              )}
            </>
          ))}
        </List>
        <List>
          {listAppbar.map((item, index) => listAppbar.length - 1 === index && (
            <ListItem
              button
              key={index}
              onClick={(e) => logout(e)}
              style={{ padding: 16 }}>
              <ListItemIcon className={classes.iconBar}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.value} />
              <ListItemIcon className={classes.openMenu}>{item.expand && <ArrowForwardIos fontSize={'small'} />}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <AppBar elevation={0} position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='default'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant='permanent'
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}

Sidebar.propTypes = {
  window: PropTypes.func,
}

export default Sidebar