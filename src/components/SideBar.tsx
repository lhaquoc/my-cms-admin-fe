import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import CreateIcon from '@mui/icons-material/Create'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Session, Navigation, Router } from '@toolpad/core'
import { TextField, Tooltip } from '@mui/material'
import CreateArticle from './CreateArticle'

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />
  },
  { kind: 'divider' },
  {
    segment: 'articles',
    title: 'Articles',
    icon: <ArticleIcon />
  },
  { kind: 'divider' },
  {
    segment: 'create',
    title: 'Create',
    icon: <CreateIcon />
  }
]

const DashboardPageContent = ({ pathname }: { pathname: string }) => {
  switch (pathname) {
    case '/create':
      return <CreateArticle />

    default:
      return (
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography>Dashboard content for {pathname}</Typography>
        </Box>
      )
  }
}

const Search = () => {
  return (
    <React.Fragment>
      <Tooltip title='Search' enterDelay={500}>
        <div>
          <IconButton
            type='button'
            aria-label='search'
            sx={{
              display: { xs: 'inline', md: 'none' }
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label='Search'
        variant='outlined'
        size='small'
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type='button' aria-label='search' size='small'>
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 }
          }
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
    </React.Fragment>
  )
}

interface DashboardProps {
  window?: () => Window
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme'
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536
    }
  }
})

const SideBar = (props: DashboardProps) => {
  const { window } = props
  const [pathname, setPathname] = React.useState('/dashboard')
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path))
    }
  }, [pathname])
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456'
    }
  })

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456'
          }
        })
      },
      signOut: () => {
        setSession(null)
      }
    }
  }, [])
  const dashboardWindow = window !== undefined ? window() : undefined
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={dashboardWindow}
      branding={{
        logo: <img src='https://mui.com/static/logo.png' alt='MUI logo' />,
        title: 'MUI'
      }}
    >
      <DashboardLayout slots={{ toolbarActions: Search }}>
        <DashboardPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  )
}

export default SideBar
