interface Idk {
  to: UserProps;
}

export interface UserProps {
  id: number;
  email: string;
  fullname: string;
  imgUrl: string;
  createdAt?: string;
  updatedAt?: string;
  faculty: string;
  batch: number;
  isAdmin: boolean;
  followers: number;
  networking_tasks: Idk[];
}

export interface FriendProps extends UserProps {
  status:
    | "not_connected"
    | "meminta_konfirmasi"
    | "menunggu_konfirmasi"
    | "accepted"
    | "sedang_networking"
    | "done";
}

export interface QuestionProps {
  id: number;
  question: string;
}

export interface UserCreatedQuestionAnswerProps {
  question: string;
  answer: string;
}

export interface QuestionAnswerProps {
  questionId: number;
  answer: string;
  question: QuestionProps;
}

export interface NetworkingAssignmentProps {
  fromId: number;
  toId: number;
  is_done: boolean;
  questions: QuestionAnswerProps[];
  img_url: string;
}

export type FriendsAPIResponse = {
  friends: FriendProps[];
};

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  status: number;
};
