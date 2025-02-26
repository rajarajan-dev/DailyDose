import { useEffect, useMemo, useState, useCallback } from "react";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";

const useDrugsManage = () => {
  const [data, setData] = useState<DrugDocumentWithUser[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const account = await AppwriteService.getInstance().getAccount();
      const userId = account.$id;
      const response =
        await AppwriteService.getInstance().getListOfDrugsforUser(userId);

      let drugList: DrugDocumentWithUser[] = response.documents.map((doc) => ({
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
      }));

      setData(drugList);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useDrugsManage;
