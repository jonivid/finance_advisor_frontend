import { useForm } from "react-hook-form";
import styles from "./FinancialForm.module.css";

interface FinancialFormProps {
  onSubmit: (data: FinancialFormData) => void;
}

interface FinancialFormData {
  income: number;
  expenses: number;
}

export default function FinancialForm({ onSubmit }: FinancialFormProps) {
  const { register, handleSubmit, reset } = useForm<FinancialFormData>();

  const submitForm = (data: FinancialFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="income" className={styles.label}>
          Monthly Income
        </label>
        <input
          type="number"
          id="income"
          className={styles.input}
          {...register("income", { required: true })}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="expenses" className={styles.label}>
          Monthly Expenses
        </label>
        <input
          type="number"
          id="expenses"
          className={styles.input}
          {...register("expenses", { required: true })}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
