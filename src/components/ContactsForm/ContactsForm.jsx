import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  useAddContactsMutation,
  useGetContactsQuery,
} from 'services/contactsApi';
import { Formik } from 'formik';
import { HiUserAdd } from 'react-icons/hi';
import {
  Form,
  FormLabel,
  Field,
  AddButton,
  ErrorMessage,
} from 'components/ContactsForm/ContactsForm.styled.js';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'the name is too short')
    .max(100, 'the name is too long')
    .required('the name is required'),
  number: Yup.string()
    .min(3, 'the number is too short')
    .max(50, 'the number is too long')
    .required('the number is required'),
});

export const ContactsForm = () => {
  const [addContact] = useAddContactsMutation();
  const { data } = useGetContactsQuery();

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const handleSubmit = async (values, { resetForm }) => {
    const doubleContact = data.find(contact =>
      contact.name.toLowerCase().includes(values.name.toLowerCase())
    );
    const variable =
      doubleContact && doubleContact.name.length === values.name.length;
    if (variable) {
      toast.error(`${values.name} is already in Contacts`, {
        onClose: resetForm,
      });
    } else {
      await addContact({ name: values.name, number: values.number });
      toast.success(`${values.name} added to the Contacts`, {
        onClose: resetForm,
      });
    }
  };
  // const resetState = () => {
  //   setName('');
  //   setNumber('');
  // };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormLabel htmlFor="name">
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
        </FormLabel>
        <FormLabel htmlFor="number">
          Phone number
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, pa-rentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="span" />
        </FormLabel>
        <AddButton type="submit">
          <HiUserAdd />
          Add contact
        </AddButton>
      </Form>
    </Formik>
  );
};
