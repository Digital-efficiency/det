'use client';
import React, { useEffect, useState } from "react"
import { invoke } from '@tauri-apps/api/tauri'
import styles from './page.module.css'

export default function PortsListPage(): React.ReactElement {
  const [ portList, setPortList ] = useState<any>(null)

  useEffect(() => {
    invoke<string>('get_open_ports')
      .then(res => {
        setPortList(res)
      })
      .catch(console.error)
    invoke<string>('kill_process', { identifier: 11788 })
      .then(console.log)
      .catch(console.error)
  }, [])

  return (
    <>
      {portList && Array.isArray(portList) ? (
        portList.map((portInfo, index) => (
          <div key={index}>
            Port: {portInfo[0]}, PID: {portInfo[1]}, Status: {portInfo[2]}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}