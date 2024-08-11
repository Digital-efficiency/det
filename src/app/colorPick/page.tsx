'use client';
import { Button, Card, Divider, Flex, Form, Input, message } from "antd";
import { LeftOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import type React from "react";
import ColorPicker from '@rc-component/color-picker';
import { useColorConverter } from "@/hooks";
import '@rc-component/color-picker/assets/index.css';
import styles from './page.module.css'
import type { FieldType, ValidatorTypes } from "./types";

export default function ColorPickPage(): React.ReactElement {
  const [ messageApi, contextHolder ] = message.useMessage();
  const { hex, rgb, hsl, handleColorChange } = useColorConverter('#ffffff');

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleHexChange = (e: any) => {
    handleColorChange(e.target.value, 'hex');
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleRgbChange = (e: any) => {
    const [r, g, b] = e.target.value.split(',').map(Number);
    handleColorChange({ r, g, b }, 'rgb');
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleHslChange = (e: any) => {
    const [h, s, l] = e.target.value.split(',').map(Number);
    handleColorChange({ h, s, l }, 'hsl');
  };

  // valid function
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const validateHex = (value: any) => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(value);
  };
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const validateRgb = (value: any) => {
    const rgbRegex = /^(?:[0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|255),(?:[0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|255),(?:[0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|255)$/;
    return rgbRegex.test(value);
  };
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const validateHsl = (value: any) => {
    const hslRegex = /^(?:[0-9]{1,3}|[1-2][0-9]{2}|3[0-5][0-9]|360),(0(\.\d+)?|1),(0(\.\d+)?|1)$/;
    return hslRegex.test(value);
  };
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const createColorValidator = (validator: ValidatorTypes) => (rule: any, value: any) => {
    if (validator(value)) {
      return Promise.resolve();
    }
    return Promise.reject('请选择正确的颜色值');
  };
  
  const validateHexColor = createColorValidator(validateHex);
  const validateRgbColor = createColorValidator(validateRgb);
  const validateHslColor = createColorValidator(validateHsl);

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
        handleColorChange(result.sRGBHex, 'hex');
      })
      .catch((err: Error) => {
        messageApi.open({
          type: 'error',
          content: `发生错误：${err?.message || '未知错误'}`,
        });
      });
  }

  const renderCardExtra: React.ReactNode = (
    <Button type="primary" onClick={openPicker}>拾取屏幕颜色</Button>
  )

  const renderFormSpace: React.ReactNode = (
    <div className={styles.page_picker_content_top_space}>
      <Flex justify="center">
        <DownOutlined />
        <UpOutlined />
      </Flex>
    </div>
  );

  return (
    <>
      <div className={styles.page_picker_header}>
        <LeftOutlined />
        <span className={styles.page_picker_header_text}>返回</span>
      </div>
      <div className={styles.page_picker_content}>
        <Card title="颜色工具工作区" bordered={false} extra={renderCardExtra}>
          <div className={styles.page_picker_content_top}>
            <ColorPicker value={hex} style={{ padding: 0, boxShadow: 'none', width: '17rem' }}/>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ minWidth: '25rem' }}
            >
              <Form.Item<FieldType>
                label="HEX格式值"
                name="hex"
                id="hex"
                rules={[{ validator: validateHexColor, message: '请输入正确的HEX格式的颜色值' }]}
              >
                <Input 
                  type="text" 
                  value={hex} 
                  defaultValue={hex} 
                  onChange={handleHexChange} 
                  placeholder="请输入HEX格式的值,例如:#ffffff"
                />
              </Form.Item>
              {renderFormSpace}
              <Form.Item<FieldType>
                label="RGB格式值"
                name="rgb"
                rules={[{ validator: validateRgbColor, message: '请输入正确的RGB格式的颜色值' }]}
              >
                <Input 
                  type="text" 
                  value={rgb ? `${rgb.r},${rgb.g},${rgb.b}` : ''} 
                  defaultValue={rgb ? `${rgb.r},${rgb.g},${rgb.b}` : ''} 
                  onChange={handleRgbChange} 
                  placeholder="请输入RGB格式的值,例如:255,255,255" 
                />
              </Form.Item>
              {renderFormSpace}
              <Form.Item<FieldType>
                label="HSL格式值"
                name="hsl"
                rules={[{ validator: validateHslColor, message: '请输入正确的HSL格式的颜色值!' }]}
              >
                <Input 
                  type="text" 
                  value={hsl ? `${hsl.h},${hsl.s},${hsl.l}` : ''} 
                  defaultValue={hsl ? `${hsl.h},${hsl.s},${hsl.l}` : ''}
                  onChange={handleHslChange} 
                  placeholder="请输入HSL格式的值,例如:0,0,1" 
                />
              </Form.Item>
            </Form>
          </div>
          <Divider />
          
        </Card>
      </div>
    </>
  )
}