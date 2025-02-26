import { useEffect, useMemo, useState } from "react";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";

const useDrugsByFilters = (searchFilter: {
  drugName: string;
  startDate: string;
  endDate: string;
  timing: string[];
  status: string;
  doctor: string;
}) => {
  const [data, setData] = useState<DrugDocumentWithUser[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account = await AppwriteService.getInstance().getAccount();
        const userId = account.$id;
        const response =
          await AppwriteService.getInstance().getListOfDrugsbyFilters(
            userId,
            searchFilter
          );

        let drugList: DrugDocumentWithUser[] = response.documents.map(
          (doc) => ({
            $id: doc.$id,
            name: doc.name,
            description: doc.description,
            dosage: doc.dosage,
            timing: doc.timing,
            canbetaken: doc.canbetaken,
            startdate: doc.startdate,
            enddate: doc.enddate,
            doctor: doc.doctor,
            user_id: doc.user_id,
            taken: doc.taken,
          })
        );

        console.log(" User Drugs by fillter result " + drugList);
        setData(drugList);
      } catch (err) {
        console.log(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useDrugsByFilters;
