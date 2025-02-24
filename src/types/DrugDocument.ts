export interface DrugDocument {
  name: string;
  description: string;
  dosage: string;
  timing: string[];
  taken: string;
  startDate: string;
  endDate: string;
  doctor: string;
}

export interface DrugDocumentWithUser {
  name: string;
  description: string;
  dosage: string;
  timing: string[];
  taken: false;
  startdate: string;
  enddate: string;
  doctor: string;
  user_id: string;
  canbetaken: string;
}
