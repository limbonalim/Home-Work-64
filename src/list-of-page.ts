import axiosApi from './axios-api';
import {PagesInfo} from './types';

export const getPages = async () => {
  try {
    const request = await axiosApi.get('/pages.json');
    const pages = request.data
    const keys: string[] = Object.keys(pages);
    return keys.map((item):PagesInfo => {
      return {name: pages[item].name ,id: item}
    })
  } catch (error: Error) {
    console.log(error)
  }
};

