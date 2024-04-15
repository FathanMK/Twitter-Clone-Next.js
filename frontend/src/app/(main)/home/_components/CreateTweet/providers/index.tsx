import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import useCreateTweet from "../hooks/useCreateTweet";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { TTweetSchema } from "../schema/Tweet";

interface ICreateTweetContext {
  isLoading: boolean;
  register: UseFormRegister<TTweetSchema>;
  tweet: string;
  images: any;
  setValue: UseFormSetValue<TTweetSchema>;
  handleSubmit: UseFormHandleSubmit<TTweetSchema>;
  onSubmit: SubmitHandler<TTweetSchema>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export const CreateTweetContext = createContext({} as ICreateTweetContext);

export default function CreateTweetProvider({
  children,
}: {
  children: ReactNode;
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
  } = useCreateTweet(setFiles);
  return (
    <CreateTweetContext.Provider
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
    </CreateTweetContext.Provider>
  );
}
