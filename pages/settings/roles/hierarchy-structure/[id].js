import React from 'react'
import {
  CssBaseline, Paper, Typography, Divider,
  Button, Grid, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from '@material-ui/core'
import { AccountTree, List } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
// import Tree from 'react-d3-tree'
import Axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'next/router'

import Meta from '../../../../lib/Meta'
import MappingHierarchy from '../../../../lib/MappingHierarchy'
import Sidebar from '../../../../components/Sidebar'
import baseURL from '../../../../utils/baseURL'

let Tree = {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardContainer: {
    padding: 16
  },
  contentHeaderContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divider: {
    height: 2,
    margin: '16px -16px'
  },
  addButton: {
    background: 'red',
    '&:hover': {
      background: 'red',
    },
    color: 'white',
    fontSize: 12,
  },
  headerDataTable: {
    backgroundColor: 'red',
    borderBottom: '1px solid #bdbdbd',
    color: 'white',
    padding: 16
  },
  resultContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    margin: '16px 0',
  },
  tableHead: {
    backgroundColor: 'red',
    color: 'white'
  }
}))

function DetailData() {
  const classes = useStyles()
  const router = useRouter()
  const [dataDetail, setDataDetail] = React.useState([])
  const [showHierarchy, setShowHierarchy] = React.useState(false)
  const [translate, setTranslate] = React.useState({})
  const [renderer, setRenderer] = React.useState(false)

  const { id } = router.query

  React.useEffect(() => {
    getReactTree()
    getDetailData()
  }, [])

  const callBackRef = React.useCallback(domNode => {
    if (domNode) {
      setTranslate({ x: domNode.getBoundingClientRect().width / 2, y: domNode.getBoundingClientRect().height / 2 })
    }
  }, [])

  const getReactTree = async () => {
    let res = await import('react-d3-tree')
    Tree = res.default
    setRenderer(!renderer)
  }

  const getDetailData = async () => {
    try {
      let token = await localStorage.getItem('token')
      let res = await Axios({
        method: 'GET',
        url: `${baseURL}/v2/hierarchy-structure/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDataDetail(res.data.payload)
    } catch (e) {
      console.log(e, e.response)
    }
  }

  const renderInput = (label, multiline, value) => {
    return (
      <TextField
        disabled={true}
        label={label}
        multiline={multiline}
        rows={multiline && 4}
        fullWidth
        value={value}
        variant='outlined' />
    )
  }

  const renderSummary = (classes, placement) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>No</TableCell>
                <TableCell className={classes.tableHead} align='center'>ID</TableCell>
                <TableCell className={classes.tableHead} align='center'>Position and Departement</TableCell>
                <TableCell className={classes.tableHead} align='center'>Parent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {placement.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='center'>{row.id_hierarchy_structure_placement}</TableCell>
                  <TableCell align='center'>{`${row.position} - ${row.department}`}</TableCell>
                  <TableCell align='center'>{`${row.parent_position} - ${row.parent_department}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  const renderHierarchy = (placement, renderer) => {
    let data = MappingHierarchy(placement, undefined)

    return (
      renderer && (
        <div style={{ width: '100%', height: '80vh' }}
          ref={callBackRef}>
          <Tree
            data={data}
            translate={translate}
            pathFunc={'step'}
            orientation={'vertical'}
          />
        </div>
      )
    )
  }

  const renderData = (classes, data) => {
    const router = useRouter()

    return (
      <>
        <Grid container spacing={2} style={{ margin: '8px 0' }}>
          <Grid item xs={12} sm={6}>
            {renderInput('ID', false, data.id)}
          </Grid>
          <Grid item xs={12} sm={6} style={{ alignSelf: 'center' }}>
            <Typography>{`Status: ${data.is_active}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderInput('Name', false, data.name)}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderInput('Applied At', false, data.name)}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderInput('Description', true, data.description)}
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.resultContainer} style={{ justifyContent: 'space-between' }}>
          <Typography >Structure</Typography>
          <Button onClick={() => { setShowHierarchy(!showHierarchy) }}>
            {showHierarchy ? <List /> : <AccountTree />}
          </Button>
        </div>
        {showHierarchy ? renderHierarchy(data.placement, renderer) : renderSummary(classes, data.placement)}
        <div className={classes.resultContainer} style={{ justifyContent: 'flex-end' }}>
          <Button className={classes.addButton} onClick={() => router.back()}>Back</Button>
        </div>
      </>
    )
  }
  console.log(translate);
  

  return (
    <div className={classes.root}>
      <Meta title='HK Inovasi Untuk Solusi | Detail' />
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper elevation={0} className={classes.cardContainer}>
          <Typography style={{ alignSelf: 'center', borderLeft: '4px solid red', textIndent: 18 }}>Detail</Typography>
          <Divider className={classes.divider} />
          {!_.isEmpty(dataDetail) && renderData(classes, dataDetail)}
        </Paper>
      </main>
    </div>
  )
}

DetailData.getInitialProps = (ctx) => {
  return { initialProps: true }
}

export default DetailData
