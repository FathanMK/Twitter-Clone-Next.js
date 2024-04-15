import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import useCreateReply from "../hooks/useCreateReply";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { TReplySchema } from "../schema/Reply";

interface ICreateReplyContext {
  isLoading: boolean;
  register: UseFormRegister<TReplySchema>;
  tweet: string;
  images: any;
  setValue: UseFormSetValue<TReplySchema>;
  handleSubmit: UseFormHandleSubmit<TReplySchema>;
  onSubmit: SubmitHandler<TReplySchema>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export const CreateReplyContext = createContext({} as ICreateReplyContext);

export default function CreateReplyProvider({
  children,
  tweetId,
}: {
  children: ReactNode;
  tweetId: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const {
    isLoading,
    register,
    tweet,
    images,
    setValue,
    handleSubmit,
    onSubmit,
  } = useCreateReply(setFiles, tweetId);
  return (
    <CreateReplyContext.Provider
      value={{
        files,
        setFiles,
        isLoading,
        register,
        tweet,
        images,
        setValue,
        handleSubmit,
        onSubmit,
      }}
    >
      {children}
    </CreateReplyContext.Provider>
  );
}
