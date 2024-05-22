import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import styles from './user.module.css'
import UserMenue from "./UserMenue";

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <div>
        <Layout title="Delivery Restaurant-Dashboard" >
          <h2 className={styles.userName}>Hi : {auth.existingUser.name} </h2>
          <UserMenue />
        </Layout>
    </div>
  );
};

export default Dashboard;
