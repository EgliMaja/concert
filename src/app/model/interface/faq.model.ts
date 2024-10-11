export interface FaqModel {
  id: number;
  panel: string;
  panel_description: DescriptionModel[];
}

export interface DescriptionModel {
  id: number;
  question: string;
  answer: string;
}

export interface DataFaqModel {
  faq: FaqModel[];
}
