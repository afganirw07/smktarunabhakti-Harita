'use client'

import React, { ReactNode } from 'react'
import 'styles/App.css'
import 'styles/Contact.css'
// import '@asseinfo/react-kanban/dist/styles.css'
// import 'styles/Plugins.css'
import 'styles/MiniCalendar.css'
import 'styles/index.css'

import dynamic from 'next/dynamic'

// === Context Provider kamu ===
import { SidebarProvider } from '../contexts/SidebarContextUser'
import { ThemeProvider } from '../contexts/ThemeContext'

const _NoSSR = ({ children }: { children: ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
)

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
})

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <NoSSR>
      <SidebarProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SidebarProvider>
    </NoSSR>
  )
}
