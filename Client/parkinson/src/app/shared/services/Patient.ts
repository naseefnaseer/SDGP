export interface Patient {
  _id: number;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  address: string;
  phone: string;
  age: string;
}

export interface EditPatient {
  id: number;
  data: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
    phone: string;
  }
}
