import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal'; // Import the Modal component
import styles from '@/styles/Home.module.css';
import UserTable from '../components/UserTable';
import CompletedUserTable from '../components/CompletedUserTable'

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

  const jsonData = {
    data: [
      // ... your JSON data here
      
        {
          "name": "Sam Altman",
          "risk_level": "Medium",
          "trigger_reason": "IP Change",
          "action_reason": "Flagged",
          "action_taken_by": {
            "name": "Neil",
            "email": "neil@onjuno.com"
          },
          "in_queue_for": "14 days",
          "date_added_on": "12 Oct, 2023",
          "email": "samaltman123@gmail.com",
          "previously_reviewed": "Yes",
          "previously_reviewed_date": "23 Aug, 2023"
        },
        {
          "name": "Sameer Choubey",
          "risk_level": "High",
          "trigger_reason": "FIFO",
          "action_reason": "Closed",
          "action_taken_by": {
            "name": "Pratik",
            "email": "pratik@onjuno.com"
          },
          "in_queue_for": "14 days",
          "date_added_on": "12 Oct, 2023",
          "email": "sameerchoubey123@gmail.com",
          "previously_reviewed": "No"
        },
        {
          "name": "Adarsh Panikkar",
          "risk_level": "Low",
          "trigger_reason": "IP Change",
          "action_reason": "Cleared",
          "action_taken_by": {
            "name": "Prashanth",
            "email": "prashanth@onjuno.com"
          },
          "in_queue_for": "15 days",
          "date_added_on": "12 Oct, 2023",
          "email": "adarsh@onjuno.com",
          "previously_reviewed": "No",
          "previously_reviewed_date": "12 Sep, 2023"
        },
        {
          "name": "Pratik Shetty",
          "risk_level": "High",
          "trigger_reason": "FIFO",
          "action_reason": "SOI requested",
          "action_taken_by": {
            "name": "Rasleen Kaur",
            "email": "rasleen@onjuno.com"
          },
          "in_queue_for": "15 days",
          "date_added_on": "12 Oct, 2023",
          "email": "pratik3@gmail.com",
          "previously_reviewed": "Yes",
          "previously_reviewed_date": "12 Sep, 2023"
        },
        {
          "name": "Elon Musk",
          "risk_level": "Low",
          "trigger_reason": "FIFO",
          "action_reason": "Flagged",
          "action_taken_by": {
            "name": "Pratik Shetty",
            "email": "pratik@onjuno.com"
          },
          "in_queue_for": "15 days",
          "date_added_on": "12 Oct, 2023",
          "email": "elon@twitterceo.com",
          "previously_reviewed": "Yes",
          "previously_reviewed_date": "12 Sep, 2023"
        },
        {
          "name": "Trina Kundu",
          "risk_level": "Low",
          "trigger_reason": "FIFO",
          "action_reason": "Closed",
          "action_taken_by": {
            "name": "Varun Deshpande",
            "email": "varun@onjuno.com"
          },
          "in_queue_for": "15 days",
          "date_added_on": "12 Oct, 2023",
          "email": "trina@onjuno.com",
          "previously_reviewed": "Yes",
          "previously_reviewed_date": "12 Sep, 2023"
        }
      
      
    ],
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
                {/* Display the UserTable component with JSON data */}
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
