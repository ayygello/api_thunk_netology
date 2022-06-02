import React, { useEffect } from 'react';
import './ServiceEdit.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  changeEditableServiceField,
  fetchEditableService,
  addEditedService,
} from '../../actions/actionCreators';
import { Spinner, Alert, Form, Button } from 'react-bootstrap';

const ServiceEdit = () => {
  const { item, loading, error } = useSelector((state) => state.serviceEdit);
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEditableService(serviceId));
  }, [dispatch]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeEditableServiceField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addEditedService(item.name, item.price, item.content, item.id));
    if (!error) {
      navigate('/', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className='wrapper'>
        <Spinner animation='border' variant='danger' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='wrapper'>
        <Alert variant='danger'>Произошла ошибка!</Alert>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Form>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Название</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={item?.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPrice'>
          <Form.Label>Стоимость</Form.Label>
          <Form.Control
            type='number'
            name='price'
            value={item?.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' size='lg' controlId='formContent'>
          <Form.Label>Описание</Form.Label>
          <Form.Control
            type='text'
            name='content'
            value={item?.content}
            onChange={handleChange}
          />
        </Form.Group>
        <Link to={'/'}>
          <Button variant='danger'>Отмена</Button>
        </Link>
        <Link to={'/'}>
          <Button variant='danger' onClick={handleSubmit}>
            Сохранить
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default ServiceEdit;
