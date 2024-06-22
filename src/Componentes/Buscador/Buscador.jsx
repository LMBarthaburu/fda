import { Alert, AlertTitle, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";



function Buscador() {
  const [drug, setDrug] = useState('')
  const [manufacturer, setManufacturer]=useState('')
  const [drugArray, setDrugArray]=useState([])
  const [status, setStatus]=useState(false)
  
  const handleDrug=(e)=>{
    const drug = (e.target.value)
    setDrug(drug)

  }

  const handleManufacturer=(e)=>{
    const manufacturer = (e.target.value)
    setManufacturer(manufacturer)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!drug && !manufacturer){
      return
    }
    if(manufacturer){
      axios.get(`https://api.fda.gov/drug/label.json?search=(openfda.generic_name:("${drug}")+OR+openfda.brand_name:("${drug}"))+AND+openfda.manufacturer_name:("${manufacturer}")&limit=1000`)
      .then(res => {
        if(res.status === 200){
          setDrugArray(res.data.results)
          setStatus(true)
        }
      })
      .catch(error => {
        setDrugArray([])
        setStatus(true)
      });
    }else{
      axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:("${drug}")+OR+openfda.brand_name:("${drug}")&limit=1000`)
      .then(res => {
        if(res.status === 200){
          setDrugArray(res.data.results)
          setStatus(true)
        }
      })
      .catch(error => {
        setDrugArray([])
        setStatus(true)
      });
    }
  }

  const handleClean=()=>{
    setDrug('')
    setManufacturer('')
    setDrugArray([])
    setStatus(false)
  }

  return (
    <Container>
      <Typography
        component='h1'
        variant="h6"
        sx={{
          mt: '2rem',
          textAlign: 'center',
          fontWeight: 700,
          letterSpacing: '.1rem',
        }}
      >
        FDA Approved Drug Finder
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '1rem'
        }}
      >
        <Typography
          component='p'
          sx={{
            alignSelf: 'start',
            fontSize:'0.8rem',
            opacity:'0.6',
            mb:'-0.3rem'
          }}
        >
          Enter the brand/generic name, the manufacturer, or both for accurate results.
        </Typography>
        <TextField
          id="buscador-medicamento"
          label="Brand name or generic name of the medication"
          sx={{
            width: '100%',
            mt:'1rem'
          }}
          onChange={handleDrug}
          value={drug}
        />
        <TextField
          id="buscador-fabricante"
          label="Manufacturer"
          sx={{
            width: '100%',
            mt:'1rem'
          }}
          onChange={handleManufacturer}
          value={manufacturer}
        />
        <Box
          sx={{
            display:'flex'
          }}
        >
          <Button 
            variant="contained" 
            type='submit' 
            onClick={handleSubmit}
            sx={{
              width:'85px',
              m:'0.5rem'
            }}
          >
            Search
          </Button>
          <Button 
            variant="contained" 
            type='button' 
            onClick={handleClean}
            sx={{
              width:'85px',
              backgroundColor:'red',
              m:'0.5rem',
              '&:hover':{
                backgroundColor: 'darkred',
              }
            }}
          >
            Clean
          </Button>
        </Box>
      </Box>
      {
        status && drugArray.length > 0 ? (
          <TableContainer 
            component={Paper}
            sx={{
              maxHeight:'80vh',
              my:'2rem'
            }}
          >
            <Table
              stickyHeader  
              sx={{ 
                Width: '100%',
              }} 
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight:'700',
                      width:'50%'
                    }}
                  >
                    Brand Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight:'700',
                      width:'40%'
                    }}
                  >
                    Manufacturer
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight:'700',
                      width:'10%'
                    }}
                  >
                    Info
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drugArray.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {item.openfda.brand_name}
                    </TableCell>
                    <TableCell>
                      {item.openfda.manufacturer_name}
                    </TableCell>
                    <TableCell 
                      component='a' 
                      href={`/producto/${item.id}`}
                      target='_blank'
                    >
                      link
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) 
        : 
        (
          status && 
          <Alert 
            variant="filled"
            severity="error"
            sx={{
              my:'2rem'
            }}
          >
            <AlertTitle>
              Error
            </AlertTitle>
            <strong>The searched value does not match!</strong>
          </Alert>
        )
      }
    </Container>
  )
}

export default Buscador