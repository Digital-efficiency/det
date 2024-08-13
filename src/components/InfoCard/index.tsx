import type React from "react";
import type { InfoCardProps } from "./types";
import styles from './index.module.css';
import { Flex } from "antd";

export default function InfoCard(props: InfoCardProps): React.ReactElement {
  const {title, content, width, height, icon, click}  = props;

  const CardStyles: React.CSSProperties = {
    // Defines the width of the card element.
    width: `${width ? `${width}px` : 'auto'}`, 
    // Defines the height of the card element.
    height: `${height ? `${height}px` : 'auto'}` 
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={styles.de_info_card} style={CardStyles} onClick={click}>
      <div className={styles.de_info_card_header}>
        <Flex gap="middle">
          {icon ? <span>{icon}</span> : null}
          {title ? <span className={styles.de_info_card_header_text}>{title}</span> : null}
        </Flex>
      </div>
      {content ? <span>{content}</span> : null}
    </div>
  )
}