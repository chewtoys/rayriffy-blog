import React from 'react'

import { Box, Flex } from 'rebass'

import Navbar from '../../core/components/navbar'
import TransparentLinkComponent from '../../core/components/transparentLink'
import Logo from './logo'

const HeaderComponent: React.FC = () => {
  const navTabs = [
    {
      href: '/',
      name: 'home',
    },
    {
      href: '/category',
      name: 'category',
    },
    {
      href: 'https://l.rayriffy.com/nico',
      name: '♪',
    },
  ]

  return (
    <Box mt={[4, 4, 5, 5]} mb={4}>
      <Flex justifyContent={`center`}>
        <Box width={[1/6, 1/8, 1/10, 1/15]} mb={3}>
          <TransparentLinkComponent to={`/`} aria-label={`logo`}>
            <Logo />
          </TransparentLinkComponent>
        </Box>
      </Flex>
      <Navbar align={`center`} tabs={navTabs} />
    </Box>
  )
}

export default HeaderComponent
