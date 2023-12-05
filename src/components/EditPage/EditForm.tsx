import React, {ChangeEvent, FormEvent, useState} from 'react';
import constants from '../../constants';
import {FormPageType, PageType} from '../../types';
import axiosApi from '../../axios-api';
import {useNavigate} from 'react-router-dom';

interface Props {
  title: string;
}

const EditForm: React.FC<Props> = ({title}) => {
  const [page, setPage] = useState<FormPageType>({
    select: 'home',
    title: '',
    content: ''
  });
  const navigate = useNavigate();
  const listOfOptions = constants.map(({id, title}) => (
    <option key={id} value={id}>{title}</option>
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
      const newPage: PageType = {
        title: page.title,
        content: page.content
      };
      await axiosApi.put(`/pages/${page.select}.json`, newPage);
      navigate('/');
    } catch (error: Error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1>{title}</h1>
      <div className="mb-3">
        <label htmlFor="select" className="form-label">Select Page:</label>
        <select
          onChange={onChange}
          value={page.select}
          className="form-select"
          aria-label="select page menu"
          name="select"
          id="select"
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