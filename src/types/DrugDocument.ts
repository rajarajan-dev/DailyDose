export interface DrugDocument {
  name: string;
  description: string;
  dosage: string;
  timing: string[];
  startdate: string;
  enddate: string;
  doctor: string;
  canbetaken: string;
}

export interface DrugDocumentWithUser extends DrugDocument {
  user_id: string;
}

export interface DrugDocumentWithUserAndDocId extends DrugDocumentWithUser {
  $id: string;
}
