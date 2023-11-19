import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import styles from '@/styles/Home.module.css';
import UserTable from '../components/UserTable';
import CompletedUserTable from '../components/CompletedUserTable';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState({ data: [] });
  const [darkMode, setDarkMode] = useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Fetch data from data.json
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setJsonData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Responsive Dashboard</title>
      </Head>

      <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
        <Navbar darkMode={darkMode}/>
        <main className={styles.dashboard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',marginRight:'30px' }}>
  <h1>Monitoring</h1>
  <button className={styles.darkModeButton} onClick={toggleDarkMode} style={{ marginLeft: '10px' }}>
    {darkMode ? (
      <img src="/light.png" style={{ width: '24px' }} alt="Sun" />
    ) : (
      <img src="/dark.png" style={{ width: '24px' }} alt="Moon" />
    )}
  </button>
</div>
          <div className={styles.tabs}>
            <ul className={styles.tabList}>
          <li className={activeTab === 0 ? `${styles.tabListItem} ${styles.activeTab}` : styles.tabListItem} onClick={() => handleTabChange(0)}>
            Pending
          </li>
          <li className={activeTab === 1 ? `${styles.tabListItem} ${styles.activeTab}` : styles.tabListItem} onClick={() => handleTabChange(1)}>
          Completed
          </li>
        </ul>
       
        <button className={styles.addButton} onClick={() => handleButtonClick()}>
          Close account
        </button>
       
          </div>

          <div className={styles.tabContent}>
          {activeTab === 0 && (
              <div>
         
                <UserTable data={jsonData.data} />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <CompletedUserTable data={jsonData.data} />
              </div>
            )}
          </div>
        </main>
      </div>
      {showModal && <Modal handleClose={handleCloseModal} />}
    </>
  );
};

export default Home;
