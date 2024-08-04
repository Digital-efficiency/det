import React from 'react';
import { Divider, Flex } from 'antd';
import { AppstoreOutlined, BgColorsOutlined } from '@ant-design/icons'
import { InfoCard } from '@/components';
import styles from './page.module.css';

export default function Home() {
  const colorPickIcon: React.ReactNode = <BgColorsOutlined />

  return (
    <main className="app_background min-h-svh">
      <div className={styles.app_title}>
        <AppstoreOutlined className={styles.app_icon} />
        前端常用工具集
      </div>
      <Divider />
      <div className={styles.app_content}>
        <Flex wrap gap="small">
          <InfoCard title="颜色拾取器" icon={colorPickIcon} />
        </Flex>
      </div>
    </main>
  );
}
