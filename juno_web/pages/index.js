import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal'; // Import the Modal component
import styles from '@/styles/Home.module.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);


  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Responsive Dashboard</title>
        {/* Add meta tags as needed */}
      </Head>

      <div className={styles.container}>
        <Navbar />
        <main className={styles.dashboard}>
          {/* Dashboard content */}
          <h1>Monitoring</h1>

          {/* Tabs */}
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

          {/* Tab content */}
          <div className={styles.tabContent}>
            {activeTab === 0 && (
              <div>
                <p>Content for Tab 1 goes here.</p>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <p>Content for Tab 2 goes here.</p>
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
