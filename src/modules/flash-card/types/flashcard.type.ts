export type LANGUAGE_TYPE = 'EN' | 'JP';

export type FlashCardRow = {
  id: number;
  user_id: number;
  language: LANGUAGE_TYPE;
  front: string;
  back: string;
  created_at: Date;
  updated_at: Date;
};

export type FlashCardListSearchParams = {
  userId: number;
  language?: LANGUAGE_TYPE;
  page: number;
  limit: number;
  front?: string;
  back?: string;
};
