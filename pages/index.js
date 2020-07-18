import React from 'react'
import { Container, Paper, Typography, Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreHoriz } from '@material-ui/icons'
import { useRouter } from 'next/router'
import Axios from 'axios'
import _ from 'lodash'

import Meta from '../lib/Meta'
import baseURL from '../utils/baseURL'

function Home() {
  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: 72
    },
    containerLogin: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 32,
    },
    input: {
      margin: '8px 0'
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      margin: '8px 0',
    }
  }))

  const classes = useStyles()
  const route = useRouter()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let token = localStorage.getItem('token')
    if (!_.isEmpty(token)) route.push('/settings/roles/hierarchy-structure')
  })

  const validate = async () => {
    setError('')
    setLoading(true)
    const data = { username, password }

    try {
      let res = await Axios.post(`${baseURL}/v1/auth`, data)
      setLoading(false)
      if (res.status == 200) {
        localStorage.setItem('token', res.data.payload.token)
        return route.push('/settings/roles/hierarchy-structure')
      }
    } catch (e) {
      setLoading(false)
      setError(e.response.data.description)
    }
  }

  const renderInput = (className, label, type, value, onChange) => (
    <TextField
      className={className}
      required
      label={label}
      type={type}
      onChange={onChange}
      value={value}
      fullWidth
      variant='outlined' />
  )

  return (
    <Container>
      <Meta />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Paper className={classes.containerLogin} elevation={2}>
            <Typography>Login</Typography>

            {renderInput(classes.input, 'Username', 'text', username, (e) => setUsername(e.target.value))}
            {renderInput(classes.input, 'Password', 'password', password, (e) => setPassword(e.target.value))}
            {!_.isEmpty(error) && <Typography className={classes.errorText}>{error}</Typography>}

            <Button variant="contained" color="primary" onClick={() => validate()}>{loading ? <MoreHoriz /> : 'Masuk'}</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home