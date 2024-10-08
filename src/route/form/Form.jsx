import React, { useRef, useState } from 'react';
import Input from '../../components/input/Input';
import styles from './Form.module.css';

const Form = () => {
  const scriptURL = import.meta.env.VITE_SCRIPT_URL
  const formRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);

    const fileInput = formData.get('Screenshot');
    if (fileInput) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result.split(',')[1]; 
        formData.append('file', base64File);
        formData.append('fileMimeType', fileInput.type);
        formData.append('fileName', fileInput.name);

        try {
          const response = await fetch(scriptURL, { method: 'POST', body: formData });
          const result = await response.json();
          alert('Thank you! Your form has been submitted successfully.');
          window.location.reload();
        } catch (error) {
          console.error('Error!', error.message);
        }
      };
      reader.readAsDataURL(fileInput);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form ref={formRef} onSubmit={handleSubmit} name='student-form'>
        <h1>Application Form</h1>
        <Input type='text' name='First Name' placeholder='First Name' />
        <Input type='text' name='Last Name' placeholder='Last Name' />
        <Input type='number' name='Phone' placeholder='Phone' />
        <Input type='email' name='Email' placeholder='Email' />
        <select name="Institution Type" id="Institution Type">
          <option value="college">College</option>
          <option value="polytechnic">Polytechnic</option>
        </select>
        <Input type='text' name='Institution' placeholder='Institution' />
        <Input type='text' name='Department' placeholder='Department' />
        <div className={styles.screenShotContainer}>
                <label className={styles.customFileUpload}>
                    Upload File
                    <input
                        type="file"
                        name="Screenshot"
                        id="Screenshot"
                        accept="application/pdf, image/*"
                        onChange={(e) => {
                            const fileName = e.target.files[0]?.name || '';
                            setFileName(fileName); 
                        }}
                        required
                    />
                </label>
                
                <span className={styles.fileName}>{fileName}</span>
            </div>
        <div className={styles.button}>
          <input type="submit" value="Submit" id="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
