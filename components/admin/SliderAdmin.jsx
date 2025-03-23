'use client'
import { Menu, Slider } from 'antd'
import React, { useState } from 'react'

export default function SliderAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState('1')
  return (
    <Slider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" mode="inline" items={items} onClick={(e)=> setActiveKey(e.key)} />
      </Slider>
  )
}
