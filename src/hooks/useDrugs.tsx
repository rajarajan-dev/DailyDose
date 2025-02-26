import { useEffect, useMemo, useState } from "react";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";

const useDrugs = (filter?: { today?: boolean; search?: string }) => {
  const [data, setData] = useState<DrugDocumentWithUser[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the filter object to prevent unnecessary re-renders
  const memoizedFilter = useMemo(() => filter, [filter?.today, filter?.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account = await AppwriteService.getInstance().getAccount();
        const userId = account.$id;
        const response =
          await AppwriteService.getInstance().getListOfDrugsforToday(userId);

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

        console.log(drugList);
        /*
        if (filter?.today) {
          const today = new Date().toISOString().split("T")[0];
          drugList = drugList.filter((drug) => drug.startdate === today);
        }

        if (filter?.search) {
          drugList = drugList.filter((drug) =>
            drug.name.toLowerCase().includes(filter.search.toLowerCase())
          );
        }
          */

        setData(drugList);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedFilter]);

  return { data, loading, error };
};

export default useDrugs;
