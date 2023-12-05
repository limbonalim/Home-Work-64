export interface PageType {
  title: string;
  content: string;
}

export interface FormPageType extends PageType {
  name: string;
}

export interface AddPageFormType extends FormPageType {
  id: string;
}

export interface PagesInfo {
  name: string;
  id: string;
}