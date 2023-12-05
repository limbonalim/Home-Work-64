import {useNavigate} from 'react-router-dom';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import axiosApi from '../../axios-api';
import {FormPageType, PagesInfo} from '../../types';

interface Props {
  listOfPages: PagesInfo[];
}

const EditForm: React.FC<Props> = ({listOfPages}) => {
  const [page, setPage] = useState<FormPageType>({
    name: 'home',
    title: '',
    content: ''
  });
  const navigate = useNavigate();
  const listOfOptions = listOfPages.map(({id, name}) => (
    <option key={id} value={id}>{name}</option>
  ));

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      await axiosApi.put<FormPageType>(`/pages/${page.name}.json`, page);
      navigate('/');
    } catch (error: Error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Edit page</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Select Page:</label>
        <select
          onChange={onChange}
          value={page.name}
          className="form-select"
          aria-label="select page menu"
          name="name"
          id="name"
        >
          {listOfOptions}
        </select>
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
      <button className="btn btn-outline-primary">Save</button>
    </form>
  );
};

export default EditForm;