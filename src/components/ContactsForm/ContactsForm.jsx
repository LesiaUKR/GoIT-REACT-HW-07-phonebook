import React from 'react';
import * as Yup from 'yup';
import {
  useAddContactsMutation,
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
  const [addContacts] = useAddContactsMutation();
  // const { data } = useGetContactsQuery();

 const handleSubmit = async (values) => {
  // const doubleContact = data.find((contact) =>
  //   contact.name.toLowerCase().includes(values.name.toLowerCase())
  //  );
  // const variable =
  //   doubleContact && doubleContact.name.length === values.name.length;
  // if (variable) {
  //   return toast.error(`${values.name} is already in contacts`);
  // }

  try {
    await addContacts({ name: values.name, phone: values.phone });
    toast.success(`${values.name} added to the Contacts`);
  
  } catch (error) {
    return toast.error(`Error ocured during adding contact ${values.name}`);
  }
};


  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form autoComplete="off">
        <FormLabel htmlFor="name">
          Name
          <Field
            type="text"
            name="name"
            title="Name can contain only letters, numbers and hyphen"
            placeholder="Name"
          />
          <ErrorMessage name="name" component="div" />
        </FormLabel>
        <FormLabel htmlFor="number">
          Phone number
          <Field
            type="tel"
            name="phone"
            title="Phone number must contain only numbers, spaces, hyphen and +"
            placeholder="Phone number"
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
