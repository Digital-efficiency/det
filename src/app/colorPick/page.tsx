'use client';
import { useState } from "react";
import { Card, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import type React from "react";
import styles from './page.module.css'

export default function ColorPickPage(): React.ReactElement {
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ current, setCurrent ] = useState('#ffffff');

  const openPicker = () => {
    if (!('EyeDropper' in window)) {
      messageApi.open({
        type: 'error',
        content: '你的设备不支持 EyeDropper API',
      });
      return;
    }
    // @ts-ignore
    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper
      .open({ signal: abortController.signal })
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .then((result: any) => {
        setCurrent(result.sRGBHex);
      })
      .catch((err: Error) => {
        messageApi.open({
          type: 'error',
          content: `发生错误：${err?.message || '未知错误'}`,
        });
      });
  }

  return (
    <>
      <div className={styles.page_piecker_header}>
        <LeftOutlined />
        <span className={styles.page_piecker_header_text}>返回</span>
      </div>
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  )
}