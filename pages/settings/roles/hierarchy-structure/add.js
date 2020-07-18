import React from 'react'
import {
  CssBaseline, Paper, Typography, Divider,
  Button, Grid, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Modal
} from '@material-ui/core'

import { AccountTree, List, Edit, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { useRouter } from 'next/router'

import Meta from '../../../../lib/Meta'
import Sidebar from '../../../../components/Sidebar'

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
  resultContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    margin: '16px 0'
  },
  tableHead: {
    backgroundColor: 'red',
    color: 'white'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
  },
  headerCard: {
    alignSelf: 'center',
    borderLeft: '4px solid red',
    textIndent: 18
  },
  deleteIconContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 32,
    display: 'flex',
    height: 64,
    justifyContent: 'center',
    width: 64
  },
  deleteIcon: {
    color: 'white',
    fontSize: 32
  },
  deleteTextContainer: {
    margin: '8px 0',
    textAlign: 'center'
  },
  cancelButton: {
    margin: '0 8px'
  },
  selectEditContainer: {
    marginBottom: 8
  },
  editTextModal: {
    alignSelf: 'center',
    borderLeft: '4px solid red',
    textIndent: 18
  },
  editModalSelectContainer: {
    margin: '8px 0'
  },
  labelEdit: {
    marginBottom: 4
  }
}))

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function renderInput(required, disabled, label, multiline, value, onChange) {
  return (
    <TextField
      required={required}
      disabled={disabled}
      label={label}
      multiline={multiline}
      rows={multiline && 4}
      fullWidth
      value={value}
      variant='outlined'
      onChange={onChange} />
  )
}

function renderSelect(isMulti, placeholder, options, value, onChange) {
  return (
    <Select
      isMulti={isMulti}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      className='basic-multi-select'
      classNamePrefix='select'
    />
  )
}

function AddData() {
  const classes = useStyles()
  const router = useRouter()
  const [modalStyle] = React.useState(getModalStyle)
  const [id, setId] = React.useState(uuidv4())
  const [nama, setNama] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [applyValue, setApply] = React.useState([])
  const [department, setDepartment] = React.useState([])
  const [position, setPosition] = React.useState([])
  const [parent, setParent] = React.useState([])
  const [resultStructure, setResultStructure] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [idModal, setIdModal] = React.useState(0)
  const [typeModal, setTypeModal] = React.useState('')

  const optionsApply = [
    { value: 'medan', label: 'Medan - Binjai' },
    { value: 'kantor-pusat', label: 'Kantor Pusat' },
  ]

  const optionsDepartment = [
    { value: 'pengadaan-tanah', label: 'Pengadaan Tanah' },
  ]

  const options = [
    { value: 'assistant', label: 'Assisstant' },
    { value: 'staff', label: 'Staff' },
    { value: 'vice-president', label: 'Vice President' },
  ]

  React.useEffect(() => {
    // 
  }, [])

  const validateForm = () => {
    if (_.isEmpty(nama) || _.isEmpty(description) || _.isEmpty(applyValue) || _.isEmpty(department) || _.isEmpty(position) || _.isEmpty(parent)) {
      alert('Harap mengisi data yang kosong!')
    } else {
      setResultStructure([...resultStructure, { id, nama, description, applyValue, department, position, parent }])
      setId(uuidv4())
      setNama('')
      setDescription('')
      setApply([])
      setDepartment([])
      setPosition([])
      setParent([])
    }
  }

  const handleModal = () => setOpen(!open)

  function renderForm() {
    return (
      <>
        <Grid container spacing={2} className={classes.editModalSelectContainer}>
          <Grid item xs={12}>
            {renderInput(true, true, 'ID', false, id, {})}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderInput(true, false, 'Nama', false, nama, (e) => setNama(e.target.value))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderSelect(true, 'Applied at', optionsApply, applyValue, (option) => setApply(option))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderInput(true, false, 'Description', true, description, (e) => setDescription(e.target.value))}
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography >Structure</Typography>
        <Grid container spacing={2} className={classes.editModalSelectContainer}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.labelEdit}>Department</Typography>
            {renderSelect(true, '-- Choose your department', optionsDepartment, department, (option) => setDepartment(option))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.labelEdit}>Position</Typography>
            {renderSelect(true, '-- Choose your position', options, position, (option) => setPosition(option))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.labelEdit}>Parent</Typography>
            {renderSelect(true, '-- Choose your parent', options, parent, (option) => setParent(option))}
          </Grid>
        </Grid>
        <div style={{ textAlign: 'right' }}>
          <Button className={classes.addButton} onClick={() => validateForm()}>Add Structure</Button>
        </div>
        {!_.isEmpty(resultStructure) && renderResult(classes, resultStructure)}
      </>
    )
  }

  function renderResult(classes, resultContainer) {
    return (
      <>
        <Divider className={classes.divider} />
        <div className={classes.resultContainer} style={{ justifyContent: 'space-between' }}>
          <Typography >Structure</Typography>
          <Button>
            <AccountTree />
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>No</TableCell>
                <TableCell className={classes.tableHead} align='center'>ID</TableCell>
                <TableCell className={classes.tableHead} align='center'>Position and Departement</TableCell>
                <TableCell className={classes.tableHead} align='center'>Parent</TableCell>
                <TableCell className={classes.tableHead} align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultContainer.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='center'>{row.id}</TableCell>
                  <TableCell align='center'>{`${!_.isEmpty(row.position) ? row.position[0].label : '-'} - ${!_.isEmpty(row.department) ? row.department[0].label : '-'}`}</TableCell>
                  <TableCell align='center'>{!_.isEmpty(row.parent) ? row.parent[0].label : '-'}</TableCell>
                  <TableCell align='center'>
                    <Button onClick={() => {
                      setOpen(!open)
                      setIdModal(index)
                      setTypeModal('edit')
                    }}>
                      <Edit />
                    </Button>
                    <Button onClick={() => {
                      setOpen(!open)
                      setIdModal(index)
                      setTypeModal('delete')
                    }}>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.resultContainer} style={{ justifyContent: 'flex-end' }}>
          <Button className={classes.cancelButton} onClick={() => router.back()}>Cancel</Button>
          <Button className={classes.addButton} onClick={() => {}}>Save</Button>
        </div>
      </>
    )
  }

  const updateSelectEdit = (option, type) => {
    let newArray = [...resultStructure]

    switch(type) {
      case 'department':
        newArray[idModal] = { ...resultStructure[idModal], department: option }
        break;
      case 'position':
        newArray[idModal] = { ...resultStructure[idModal], position: option }
        break;
      case 'parent':
        newArray[idModal] = { ...resultStructure[idModal], parent: option }
        break;
    }
    setResultStructure(newArray)
  }

  const editModal = () => (
    <>
      <Typography className={classes.editTextModal}>Edit</Typography>
      <Divider className={classes.divider} />
      <Grid container className={classes.editModalSelectContainer}>
        <Grid item xs={12} className={classes.selectEditContainer}>
          <Typography className={classes.labelEdit}>Department</Typography>
          {renderSelect(true, '-- Choose your department', optionsDepartment, resultStructure[idModal].department, (option) => updateSelectEdit(option, 'department'))}
        </Grid>
        <Grid item xs={12} className={classes.selectEditContainer}>
          <Typography className={classes.labelEdit}>Position</Typography>
          {renderSelect(true, '-- Choose your position', options, resultStructure[idModal].position, (option) => updateSelectEdit(option, 'position'))}
        </Grid>
        <Grid item xs={12} className={classes.selectEditContainer}>
          <Typography className={classes.labelEdit}>Parent</Typography>
          {renderSelect(true, '-- Choose your parent', options, resultStructure[idModal].parent, (option) => updateSelectEdit(option, 'parent'))}
        </Grid>
      </Grid>
      <div className={classes.resultContainer} style={{ justifyContent: 'flex-end', margin: '16px 0 0' }}>
        <Button className={classes.cancelButton} onClick={() => setOpen(!open)}>Cancel</Button>
        <Button className={classes.addButton} onClick={() => setOpen(!open)}>Save</Button>
      </div>
    </>
  )

  const deleteModal = (
    <div className={classes.resultContainer} style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <div className={classes.deleteIconContainer}>
        <Delete className={classes.deleteIcon} />
      </div>
      <div className={classes.deleteTextContainer}>
        <Typography variant='h6' style={{ color: 'red' }}>Penghapusan Data</Typography>
        <Typography>Apakah Anda yakin ingin menghapus data ini?</Typography>
      </div>
      <div className={classes.resultContainer} style={{ justifyContent: 'center', margin: '16px 0 0' }}>
        <Button className={classes.cancelButton} onClick={() => setOpen(!open)}>Cancel</Button>
        <Button className={classes.addButton} onClick={() => resultStructure.splice(idModal, 1) && setOpen(!open)}>Save</Button>
      </div>
    </div>
  )

  return (
    <div className={classes.root}>
      <Meta title='HK Inovasi Untuk Solusi | Add' />
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper elevation={0} className={classes.cardContainer}>
          <Typography className={classes.headerCard}>Add</Typography>
          <Divider className={classes.divider} />
          {renderForm()}
          <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              {typeModal == 'edit' ? editModal() : deleteModal}
            </div>
          </Modal>
        </Paper>
      </main>
    </div>
  )
}

export default AddData
