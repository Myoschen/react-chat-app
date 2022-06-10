export interface Message {
  from: string;
  to: string;
  data: string;
  type: 'TEXT' | 'IMAGE',
  time: string;
};