'use client';
import type React from 'react';
import { Divider, Flex } from 'antd';
import { AppstoreOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { InfoCard } from '@/components';
import styles from './page.module.css';

export default function Home() {
  // Defines a React node representing the "BgColorsOutlined" icon.
  // This node will be used as the color picker icon.
  const colorPickIcon: React.ReactNode = <BgColorsOutlined />

  const router = useRouter();

  const openColorPicker: React.MouseEventHandler<HTMLDivElement> = () => {
    router.push('/colorPick')
  }

  return (
    <main>
      <div className={styles.app_title}>
        <AppstoreOutlined className={styles.app_icon} />
        前端常用工具集
      </div>
      <Divider />
      <div className={styles.app_content}>
        <Flex wrap gap="small">
          <InfoCard title="颜色工具" icon={colorPickIcon} click={openColorPicker} />
        </Flex>
      </div>
    </main>
  );
}
