import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axios-api';
import {AddPageFormType, FormPageType} from '../../types';

const AddPage = () => {
  const [page, setPage] = useState<AddPageFormType>({
    name: '',
    id: '',
    title: '',
    content: ''
  });
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPage((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data: FormPageType = {
        title: page.title,
        name: page.name,
        content: page.content
      };
      await axiosApi.put<FormPageType>(`/pages/${page.id}.json`, data);
      navigate('/');
    } catch (error: Error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <h1>Add Page</h1>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">Enter Page ID:</label>
        <input
          onChange={onChange}
          value={page.id}
          required
          type="text"
          className="form-control"
          id="id"
          name="id"
          pattern="^[a-z]+(?:-[a-z]+)*$"
          placeholder="Some Page"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Enter Page Name:</label>
        <input
          onChange={onChange}
          value={page.name}
          required
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Some Page"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          onChange={onChange}
          value={page.title}
          required
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Some Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content:</label>
        <textarea
          onChange={onChange}
          value={page.content}
          required
          className="form-control"
          id="content"
          name="content"
          placeholder="Some Content"
          rows="3"
        ></textarea>
      </div>
      <button className="btn btn-outline-primary">Add</button>
    </form>
  );
};

export default AddPage;