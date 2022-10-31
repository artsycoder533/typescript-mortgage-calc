import type { NextPage } from "next";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

type Loan = {
  principal: number;
  rate: string;
  term: number;
};

type LoanErrors = {
  principalError: string;
  rateError: string;
  termError: string;
};

const Home: NextPage = () => {
  const [form, setForm] = useState<Loan>({
    principal: 0,
    rate: "0",
    term: 0,
  });
  const [formError, setFormErrors] = useState<LoanErrors>({
    principalError: "",
    rateError: "",
    termError: "",
  });
  const [payment, setPayment] = useState<string>("");

  const handleCalculate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validate = checkForErrors(form);
    if (validate) {
      const { principal, rate, term } = form;
      const r = (parseInt(rate)/ 100) / 12;
      const n = term * 12;
      //principal(rate(1+rate)^term) /((1+rate)^term)-1))
      const result =
        principal * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const formattedResult = formatCurrency(result);
      setPayment(formattedResult);
      setFormErrors({
        principalError: "",
        rateError: "",
        termError: "",
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target;
    console.log(name, value, typeof value)
    setForm({ ...form, [name]: value });
  };

  const checkForErrors = (form: Loan) => {
    const { principal, rate, term } = form;
    const errors = { ...formError };
    let isValid = true;
    if (principal == 0) {
      errors.principalError = "Principal cannot be blank!";
      isValid = false;
    }
    if (rate == "0") {
      errors.rateError = "Rate cannot be blank!";
      isValid = false;
    }
    if (term == 0) {
      errors.termError = "Term cannot be blank!";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  const formatCurrency = (number: number)=> {
    return CURRENCY_FORMATTER.format(number);
  }

  const resetForm = () => {
    setForm({
      principal: 0,
      rate: "0",
      term: 0,
    });
     setFormErrors({
       principalError: "",
       rateError: "",
       termError: "",
     });
    setPayment("");
  };

  const { principalError, rateError, termError } = formError;

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Mortgage Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleCalculate} className={styles.form}>
          <h1 className={styles.title}>Mortgage Calculator</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="principal">Principal Loan Amount:</label>
            <input
              type="number"
              name="principal"
              id="principal"
              min={0}
              onChange={handleChange}
              value={form.principal}
              className={styles.input}
            />
            <small className={styles.error}>{principalError}</small>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="rate">Interest Rate:</label>
            <input
              type="number"
              name="rate"
              id="rate"
              step="0.001"
              onChange={handleChange}
              value={form.rate}
              className={styles.input}
            />
            <small className={styles.error}>{rateError}</small>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="term">Length of Loan (in years):</label>
            <input
              type="number"
              name="term"
              id="term"
              min={0}
              onChange={handleChange}
              value={form.term}
              className={styles.input}
            />
            <small className={styles.error}>{termError}</small>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Calculate
            </button>
            <button type="button" onClick={resetForm} className={styles.button}>
              Clear Form
            </button>
          </div>
          <p className={styles.result}>
            {payment ? (
              <>
                Your monthly mortgage payment will be{" "}
                <span className={styles.amount}>{payment}</span>
              </>
            ) : (
              ""
            )}
          </p>
        </form>
      </main>
    </div>
  );
};

export default Home;
