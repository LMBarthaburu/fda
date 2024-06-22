import {Box, Breadcrumbs, Container, LinearProgress, Link, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductoInfoCard from '../ProductoInfoCard/ProductoInfoCard'


function ProductoInfo() {
  const [drugArray, setDrugArray] = useState({})
  
  const {id} = useParams()

  const getData =()=>{
    axios.get(`https://api.fda.gov/drug/label.json?search=id:${id}`)
    .then(res => {
      if(res.status ===200){
        setDrugArray(res.data.results);
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])// eslint-disable-line
  

  return (
    <Container>
      <Breadcrumbs
        sx={{
          mt:'1rem',
          display:'flex',
          fontSize:'12px',
        }}
      >
        <Link 
          href={`/`}
          sx={{
            textDecoration:'none',
            fontWeight:'700'
          }}                   
        >
          Home 
        </Link>
        <Typography
          variant='p'
        >
          {id}
        </Typography>
      </Breadcrumbs>
      {drugArray.length > 0?
        drugArray.map(item => (
          <Box
            key={id} 
            sx={{ 
              my: '1rem',
              display: 'flex',
              flexDirection:'column',
            }}
          >
            <Typography
              component='h1'
              sx={{
                fontSize:{ xs:'2.3rem', md:'3.2rem' },
                fontWeight:'800'
              }}
            >
              {item.openfda.brand_name}
            </Typography>
            <Typography
              component='h2'
              sx={{
                fontSize:{ xs:'1.6rem', md:'2.3rem' },
                fontWeight:'800'
              }}
            >
              {item.openfda.manufacturer_name}
            </Typography>
            <Typography
              component='h3'
              sx={{
                overflowWrap: 'break-word',
                fontSize:{ xs:'1rem', md:'1.4rem' },
                fontWeight:'600',
                mb:'2rem'
              }}
            >
              Generic name: {item.openfda.generic_name}
              <br />
              Substance: {item.openfda.substance_name}
              <br />
              Product type: {item.openfda.product_type}
              <br />
              Route: {item.openfda.route}
            </Typography>
            <Box>
              {item.purpose && item.purpose.map(item=><ProductoInfoCard info={item}/>)}
              {item.dosage_and_administration && item.dosage_and_administration.map(item=><ProductoInfoCard info={item}/>)}
              {item.when_using && item.when_using.map(item=><ProductoInfoCard info={item}/>)}
              {item.indications_and_usage && item.indications_and_usage.map(item=><ProductoInfoCard info={item}/>)}
              {item.active_ingredient && item.active_ingredient.map(item=><ProductoInfoCard info={item}/>)}
              {item.inactive_ingredient && item.inactive_ingredient.map(item=><ProductoInfoCard info={item}/>)}
              {item.spl_product_data_elements && item.spl_product_data_elements.map(item=><ProductoInfoCard info={item}/>)}
              {item.adverse_reactions && item.adverse_reactions.map(item=><ProductoInfoCard info={item}/>)}
              {item.storage_and_handling && item.storage_and_handling.map(item=><ProductoInfoCard info={item}/>)}
              {item.stop_use && item.stop_use.map(item=><ProductoInfoCard info={item}/>)}
              {item.keep_out_of_reach_of_children && item.keep_out_of_reach_of_children.map(item=><ProductoInfoCard info={item}/>)}
              {item.do_not_use && item.do_not_use.map(item=><ProductoInfoCard info={item}/>)}
              {item.pregnancy_or_breast_feeding && item.pregnancy_or_breast_feeding.map(item=><ProductoInfoCard info={item}/>)}
              {item.contraindications && item.contraindications.map(item=><ProductoInfoCard info={item}/>)}
              {item.ask_doctor && item.ask_doctor.map(item=><ProductoInfoCard info={item}/>)}
              {item.ask_doctor_or_pharmacist && item.ask_doctor_or_pharmacist.map(item=><ProductoInfoCard info={item}/>)}
              {item.warnings && item.warnings.map(item=><ProductoInfoCard info={item}/>)}
              {item.warnings_and_cautions && item.warnings_and_cautions.map(item=><ProductoInfoCard info={item}/>)}
            </Box>
          </Box>
        ))
        :
        <Box
          sx={{
            mt:'5rem',
          }}
        >
          <LinearProgress />
        </Box>
      }
    </Container>
  )
}

export default ProductoInfo