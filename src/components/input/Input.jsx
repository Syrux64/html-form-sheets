import React from 'react'
import styles from './Input.module.css'

const Input = ( { label, type, name, placeholder} ) => {
  return (
    <div className={styles.inputContainer}>
      <input type={type} name={name} placeholder={placeholder} className={styles.input} required />
      <label className={styles.label}>{label}</label>
    </div>
  )
}

export default Input