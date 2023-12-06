import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axios-api';
import {AddPageFormType, FormPageType} from '../../types';
import FroalaEditor from 'react-froala-wysiwyg';

interface Props {
  getError: (message: string) => void;
}

const AddPage: React.FC<Props> = ({getError}) => {
  const [page, setPage] = useState<AddPageFormType>({
    name: '',
    id: '',
    title: '',
    content: ''
  });
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPage((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const textAriaChange = (model: string) => {
    setPage((prevState) => {
      return {
        ...prevState,
        content: model,
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
      getError(error.message);
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
        <FroalaEditor
          tag="textarea"
          onModelChange={textAriaChange}
          model={page.content}
        />
      </div>
      <button className="btn btn-outline-primary">Add</button>
    </form>
  );
};

export default AddPage;