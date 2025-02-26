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
  $id: string;
  name: string;
  description: string;
  dosage: string;
  timing: string[];
  startdate: string;
  enddate: string;
  doctor: string;
  user_id: string;
  canbetaken: string;
}
