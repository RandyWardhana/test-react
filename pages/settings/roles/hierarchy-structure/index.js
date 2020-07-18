import React from 'react'
import {
  CssBaseline, Paper, Typography, Divider,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'
import Axios from 'axios'
import Moment from 'moment'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Meta from '../../../../lib/Meta'
import Sidebar from '../../../../components/Sidebar'
import baseURL from '../../../../utils/baseURL'

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
  }
}))

function ResponsiveDrawer() {
  const classes = useStyles()
  const route = useRouter()
  const [offset, setOffset] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [total, setTotal] = React.useState(10)
  const [hierarchy, setHierarchy] = React.useState([])

  React.useEffect(() => {
    getData(offset, limit)
  }, [])

  const getData = async (offset, limit) => {
    try {
      let token = await localStorage.getItem('token')
      let res = await Axios({
        method: 'GET',
        url: `${baseURL}/v2/hierarchy-structure`,
        params: { offset, limit },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setHierarchy(res.data.payload)
      setLimit(res.data.limit)
      setOffset(res.data.offset)
      setTotal(res.data.count)
    } catch (e) {
      throw e
    }
  }

  const columns = [
    {
      name: 'No',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => (
          tableMeta.rowIndex + 1 + offset
        )
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : row}
          </td>
        )
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : row}
          </td>
        )
      }
    },
    {
      name: 'created_at',
      label: 'Applied At',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : Moment(row).format('DD/MM/YYYY hh:mm:ss')}
          </td>
        )
      }
    },
    {
      name: 'input_by',
      label: 'Input By',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : row}
          </td>
        )
      }
    },
    {
      name: 'update_by',
      label: 'Update By',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : row}
          </td>
        )
      }
    },
    {
      name: 'updated_at',
      label: 'Last Update',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <td>
            {_.isEmpty(row) ? '-' : Moment(row).format('DD/MM/YYYY hh:mm:ss')}
          </td>
        )
      }
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th className={classes.headerDataTable}>
            {columnMeta.label}
          </th>
        ),
        customBodyRender: row => (
          <Link href={`/settings/roles/hierarchy-structure/${row}`}>
            <Button className={classes.addButton}>Detail</Button>
          </Link>
        )
      }
    },
  ];

  let options = {
    filter: false,
    responsive: 'scrollMaxHeight',
    print: false,
    sort: false,
    searchable: false,
    download: false,
    search: false,
    selectableRows: false,
    elevation: 0,
    rowsPerPageOptions: [5, 10, 15, 25],
    count: total,
    page: 0,
    print: false,
    serverSide: true,
    onTableChange: (action, tableState) => {
      let limit = tableState.rowsPerPage;
      let offset = tableState.page > 0 ? (tableState.page*limit) : 0;
      if(action === 'changePage' || action === 'changeRowsPerPage'){
      getData(offset, limit)
      }
    },
    onChangePage: (currentPage) => {
      let offsetPage = currentPage > 0 ? (currentPage * limit) : 0
      getData(offsetPage, limit)
      setOffset(offsetPage)
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setLimit(numberOfRows)
      getData(0, numberOfRows)
    }
  }

  return (
    <div className={classes.root}>
      <Meta title='HK Inovasi Untuk Solusi' />
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper elevation={0} className={classes.cardContainer}>
          <div className={classes.contentHeaderContainer}>
            <Typography style={{ alignSelf: 'center', borderLeft: '4px solid red', textIndent: 18 }}>Hierarchy Structure</Typography>
            <Button className={classes.addButton} onClick={() => route.push('/settings/roles/hierarchy-structure/add')}>Add</Button>
          </div>
          <Divider className={classes.divider} />
          <MUIDataTable
            data={hierarchy}
            columns={columns}
            options={options}
          />
        </Paper>
      </main>
    </div>
  )
}

export default ResponsiveDrawer
