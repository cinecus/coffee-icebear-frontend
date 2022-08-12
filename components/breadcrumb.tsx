import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link'
import { Container } from '@mui/material';

const breadcrumb = () => {
  return (
    <Container>

    <Breadcrumbs aria-label="breadcrumb">
        <Link  href="/">
        Home
        </Link>
  </Breadcrumbs>
    </Container>
  )
}

export default breadcrumb