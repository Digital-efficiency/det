import React from "react";
import type { InfoCardProps } from "./types";
import styles from './index.module.css';
import { Flex } from "antd";

export default function InfoCard(props: InfoCardProps): React.ReactElement {
  const {title, content, width, height, icon}  = props;

  const CardStyles: React.CSSProperties = {
    width: `${width ? `${width}px` : 'auto'}`,
    height: `${height ? `${height}px` : 'auto'}`
  }

  return (
    <div className={styles.de_info_card} style={CardStyles}>
      <div className={styles.de_info_card_header}>
        <Flex gap="middle">
          {icon ? <span>{icon}</span> : null}
          {title ? <span className={styles.de_info_card_header_text}>{title}</span> : null}
        </Flex>
      </div>
    </div>
  )
}