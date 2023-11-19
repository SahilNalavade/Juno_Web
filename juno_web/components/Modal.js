import { useState, useEffect } from 'react';
import styles from '@/styles/Modal.module.css';

const Modal = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [fileUAR, setFileUAR] = useState('');
  const [chargeClosureFee, setChargeClosureFee] = useState('');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  // Update isFormFilled whenever the "Note" field changes
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setIsFormFilled(!!e.target.value); // Set to true if note is not empty, otherwise false
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (email && note) {
      setIsFormFilled(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains(styles.modalOverlay)) {
        handleClose();
      }
    };

    // Attach the event listener when the modal is mounted
    document.addEventListener('click', handleOutsideClick);

    // Remove the event listener when the modal is unmounted
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleClose]);

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
            <label htmlFor="fileUAR">Want to file UAR</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="fileUAR"
                  value="yes"
                  checked={fileUAR === 'yes'}
                  onChange={() => setFileUAR('yes')}
                />
                
              </label><label style={{fontFamily:"'Lettera Text LL', sans-serif",position:'relative',marginTop:'7px',marginRight:'20px'}}>Yes</label>
              <label>
                <input
                  type="radio"
                  name="fileUAR"
                  value="no"
                  checked={fileUAR === 'no'}
                  onChange={() => setFileUAR('no')}
                />
             
              </label>
              <label style={{fontFamily:"'Lettera Text LL', sans-serif",position:'relative',marginTop:'7px'}}>No</label>
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
  <option value="option2">Flagging logics triggered</option>
  <option value="option3">Incomplete Information</option>
  <option value="option4">Suspicious Activity</option>
  <option value="option5">Invalid Data Format</option>
  <option value="option6">Access Violations</option>
</select>


          </div>
          <div className={styles.formGroup}>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={handleNoteChange}
              style={{
                resize: 'none',
                height: '65px',
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
  <span style={{ color: '#ADADAD' }}></span>
</label>
<label style={{fontFamily:"'Lettera Text LL', sans-serif",position:'relative',marginTop:'4px',color:'#777676'}}>Charge closure fee</label>

<button
              type="submit"
              className={styles.buttonGroup}
              style={{
                width: '211px',
                height: '48px',
                padding: '16px',
                borderRadius: '8px',
                marginLeft: '8px',
                backgroundColor: isFormFilled ? '#4643EE' : '#E4E4E4',
                border: 'none',
                color: isFormFilled ? '#FFFFFF' : '#ADADAD',
                marginLeft: '50px',
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
