export type AuthField = {
  name: string;
  type: string;
  placeHolder: string;
  label: string;
  required: boolean;
  disabled?: boolean;
  classNames: string[];
  defaultValue?: string;
  choices?: ChoiceProps[];
};

export type ChoiceProps = {
  label: string;
  value: string;
};

export type ProfileProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  has_password: boolean;
  clinician:
    | {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        practice: string;
      }
    | null
    | undefined;
};
