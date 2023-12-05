export interface PageType {
  title: string;
  content: string;
}

export interface FormPageType extends PageType {
  select: string;
}

export interface Constant {
  title: string;
  id: string;
}