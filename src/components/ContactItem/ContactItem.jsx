import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, DeleteButton, ListItemName } from './ContactItem.styled';
import { HiUser } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
// import { useDispatch } from 'react-redux';
// import { deleteContact } from '../../redux/contactsSlice';

export const ContactItem = ({ id, name, number } ) => {
  // const dispatch = useDispatch();

  return (
    <ListItem>
      <HiUser />
      <ListItemName>
        {name}: {number}
      </ListItemName>
      <DeleteButton
        type="button"
        id={id}
        // onClick={() => dispatch(deleteContact(id))}
      >
        <MdDelete />
        Delete
      </DeleteButton>
    </ListItem>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
