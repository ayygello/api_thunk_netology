import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService } from '../../actions/actionCreators';

function ServiceAdd() {
  const { item, loading } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addService(item.name, item.price));
  };

  return (
    <InputGroup className='mb-3'>
      <FormControl
        name='name'
        onChange={handleChange}
        value={item.name}
        aria-describedby='basic-addon2'
      />
      <FormControl
        name='price'
        onChange={handleChange}
        value={item.price}
        aria-describedby='basic-addon2'
      />
      <Button
        variant='outline-secondary'
        disabled={loading}
        onClick={handleSubmit}
      >
        Добавить
      </Button>
    </InputGroup>
  );
}

export default ServiceAdd;
