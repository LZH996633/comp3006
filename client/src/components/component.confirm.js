import React, {useState} from 'react';
import styles from './component.module.scss';

export default ({onConfirm, onCancel}) => {
  const [content, setContent] = useState('');

  return (
    <div className={styles.gCenter + ' ' + styles.dialogCss}>
      <div className={styles.dialogContent}>
        <div className={styles.title}>Message</div>
        <div className={styles.content}>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className={styles.dBtns}>
          <div className={styles.bCancel} onClick={() => onCancel && onCancel()}>Cancel</div>
          <div  className={styles.bConfirm} onClick={() => onConfirm && onConfirm(content)}>Confirm</div>
        </div>
      </div>
    </div>
  );
};
