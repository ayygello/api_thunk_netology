import React, { useEffect } from 'react';
import './ServiceList.css';
import { ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, removeService } from '../../actions/actionCreators';
import ServiceAdd from '../ServiceAdd/ServiceAdd';
import { Link } from 'react-router-dom';

function ServiceList() {
  const { items, loading, error } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleRemove = (id) => {
    removeService(dispatch, id);
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
    <>
      <ServiceAdd />

      <div className='wrapper'>
        <ListGroup>
          {items.map((o) => (
            <>
              <ListGroup.Item key={o.id}>
                {o.name} {o.price}
                <Link to={`/services/${o.id}`}>
                  <Button variant='danger' size='sm'>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={() => handleRemove(o.id)}
                >
                  ✕
                </Button>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default ServiceList;
