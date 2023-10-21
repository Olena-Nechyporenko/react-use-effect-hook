import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const initialValues = { name: '', number: '' };
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(70, 'Must be no more than 70 characters long'),
  number: Yup.number(),
});

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.formLabel} htmlFor="name">
            Name
            <Field className={css.formInput} type="text" name="name" required />
            <span className={css.error}>
              <ErrorMessage name="name" />
            </span>
          </label>
          <label className={css.formLabel} htmlFor="number">
            Number
            <Field
              className={css.formInput}
              type="tel"
              name="number"
              placeholder="+380"
              required
            />
            <span className={css.error}>
              <ErrorMessage name="number" />
            </span>
          </label>
          <button className={css.formBtn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }
}
