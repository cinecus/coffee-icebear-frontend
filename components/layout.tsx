import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Breadcrumb from './breadcrumb'

type ChildrenProps = {
    children?: React.ReactNode
  };

export default function Layout( {children}: ChildrenProps) {
  
    return (
      <>
        <Navbar  />
        {/* <Breadcrumb/> */}
        <main>
          {children}
        </main>
        <Footer />
      </>
    )
  }