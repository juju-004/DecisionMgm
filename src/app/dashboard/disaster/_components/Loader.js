import styles from "@/styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      {/* <Image src={spinner} alt="Loading" width={250} height={250} /> */}
      <h1>Fetching data...</h1>
    </div>
  );
};

export default Loader;
