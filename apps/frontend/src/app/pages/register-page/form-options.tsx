import { FIELD_IS_REQUIRED } from '../../../const';
import * as yup from "yup";

const schema = yup.object().shape({
  avatar: yup.string().required(FIELD_IS_REQUIRED),
});

export type FormData = yup.InferType<typeof schema>;
