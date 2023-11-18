import { useState } from 'react';
import styles from '@/styles/Modal.module.css';

const Modal = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [fileUAR, setFileUAR] = useState(''); 
  const [chargeClosureFee, setChargeClosureFee] = useState(''); 

  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Close account</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            &#10005;
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fileUAR}`}>
            <label htmlFor="fileUAR">Want to file UAR:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="fileUAR"
                  value="yes"
                  checked={fileUAR === 'yes'}
                  onChange={() => setFileUAR('yes')}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="fileUAR"
                  value="no"
                  checked={fileUAR === 'no'}
                  onChange={() => setFileUAR('no')}
                />
                No
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reason">Reason</label>
            <select
  id="reason"
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  className="form-input" 
  style={{
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginTop: '5px',
    background: '#fff',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: '4px',
  }}
>
  <option value="option1"></option>  
  <option value="option2">Unauthorized charges</option>
  <option value="option3">Incorrect amounts</option>
  <option value="option4">Missing transactions</option>
  <option value="option5">To report a customer service complaint</option>
  <option value="option6">To report suspected fraud or identity theft
</option>
</select>


          </div>
          <div className={styles.formGroup}>
          <label htmlFor="note">Note</label>
<textarea
  id="note"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  style={{
    resize: 'none', 
    height:'65px'
    
  }}
/>
          </div>
          <div className={`${styles.formGroup} ${styles.fileUAR}`}>
           
          <label>
  <input
    type="radio"
    name="chargeClosureFee"
    value="yes"
    checked={chargeClosureFee === 'yes'}
    onChange={() => setChargeClosureFee('yes')}
  />
  <span style={{ color: '#ADADAD' }}>Charge closure fee</span>
</label>

<button
  style={{
    width: '211px',
    height: '48px',
    padding: '16px',
    borderRadius: '8px',
    marginLeft: '8px',
    backgroundColor: '#E4E4E4', 
    border:'none',
    color:'#ADADAD',
    marginLeft:'70px'
  }}
>
  Close Account
</button>

</div>
          
        </form>
      </div>
    </div>
  );
};

export default Modal;
