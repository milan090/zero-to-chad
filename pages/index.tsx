import { Button } from "@mui/material"
import type { NextPage } from "next"
import { NextSeo } from "next-seo"
import toast from "react-hot-toast"
import styles from "../styles/Home.module.css"

const notify = () => toast("Here is your toast.")

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <NextSeo title="Home" description="A short description goes here." />

      <main className={styles.main}>
        <h1>Hi</h1>
        <Button onClick={notify} color="primary" variant="contained">
          Toast
        </Button>
      </main>
    </div>
  )
}

export default Home
