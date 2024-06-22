import { Typography } from '@mui/material'
import React from 'react'

function ProductoInfoCard({info}) {
  return (
    <>
      <Typography
        component='p'
        variant='body2'
      >
        {info}
      </Typography>
      <hr />
    </>
  )
}

export default ProductoInfoCard