import { Client, Account, ID, Databases, Query } from "react-native-appwrite";
import { APPWRITE_CONFIG } from "./config";
import {
  DrugDocumentWithUser,
  DrugDocumentWithUserAndDocId,
} from "../types/DrugDocument";

export class AppwriteService {
  private static instance: AppwriteService = new AppwriteService();
  private account: Account;
  private client: Client;
  private databases: Databases;

  private constructor() {
    const client = new Client()
      .setProject(APPWRITE_CONFIG.PROJECT_ID)
      .setPlatform(APPWRITE_CONFIG.PLATFORM);
    this.client = client;
    this.databases = new Databases(client);
    this.account = new Account(client);
  }

  public static getInstance(): AppwriteService {
    return AppwriteService.instance;
  }

  public async createSession(email: string, password: string) {
    try {
      // Check if an active session exists
      const activeSession = await this.getActiveSession();
      if (activeSession) {
        console.log("Found active session:", activeSession.$id);

        // Ensure the user is authenticated before deleting the session
        try {
          await this.account.deleteSession(activeSession.$id);
          console.log("Closed existing session:", activeSession.$id);
        } catch (deleteError) {
          console.error("Error closing session:", deleteError);
        }
      }

      // Create a new session
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("New session created:", session.$id);
      return session;
    } catch (error) {
      console.error("Error creating session:", error);
    }
  }

  public async getActiveSession() {
    try {
      const sessions = await this.account.listSessions();
      return sessions.sessions[0]; // Return the first active session
    } catch (error) {
      console.error("Error fetching active session:", error);
      return null;
    }
  }

  public async createAccount(
    email: string,
    password: string,
    username: string
  ) {
    try {
      return await this.account.create(ID.unique(), email, password, username);
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account.");
    }
  }

  public async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching account:", error);
      throw new Error("Failed to fetch account.");
    }
  }

  public async closeSession(sessionId: string) {
    try {
      await this.account.deleteSession(sessionId);
    } catch (error) {
      console.error("Error closing session:", error);
      throw new Error("Failed to close session.");
    }
  }

  public async updatePassword(password: string, oldPassword: string) {
    try {
      return await this.account.updatePassword(password, oldPassword);
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error("Failed to update password.");
    }
  }

  public async updateRecovery(
    userId: string,
    secret: string,
    password: string
  ) {
    try {
      return await this.account.updateRecovery(userId, secret, password);
    } catch (error) {
      console.error("Error updating recovery:", error);
      throw new Error("Failed to update recovery.");
    }
  }

  public async createRecovery(email: string, url: string) {
    try {
      return await this.account.createRecovery(email, url);
    } catch (error) {
      console.error("Error creating recovery:", error);
      throw new Error("Failed to create recovery.");
    }
  }

  public async deleteDrugDocument(id: string) {
    try {
      return await this.databases.deleteDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        id
      );
    } catch (error) {
      console.error("Error deleting drug document:", error);
      throw new Error("Failed to delete drug document.");
    }
  }

  public async getDrugDocumentById(id: string) {
    try {
      return await this.databases.getDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        id
      );
    } catch (error) {
      console.error("Error fetching drug document:", error);
      throw new Error("Failed to fetch drug document.");
    }
  }

  public async updateDrugDocument(drug: DrugDocumentWithUserAndDocId) {
    try {
      return await this.databases.updateDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        drug.$id,
        drug
      );
    } catch (error) {
      console.error("Error updating drug document:", error);
      throw new Error("Failed to update drug document.");
    }
  }

  public async addDrugDocument(drug: DrugDocumentWithUser) {
    try {
      const result = await this.databases.createDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        ID.unique(),
        drug
      );
      console.log("Drug document added successfully:", result);
      return result;
    } catch (error) {
      console.error("Error adding drug document:", error);
      throw new Error("Failed to add drug document.");
    }
  }

  public async getListOfDrugsforUser(userId: string) {
    try {
      return await this.databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        [Query.equal("user_id", userId), Query.orderDesc("enddate")]
      );
    } catch (error) {
      console.error("Error fetching drugs for user:", error);
      throw new Error("Failed to fetch drugs for user.");
    }
  }

  public async getListOfDrugsforToday(userId: string) {
    try {
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setUTCHours(23, 59, 59, 999);

      return await this.databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        [
          Query.equal("user_id", userId),
          Query.lessThanEqual("startdate", endOfToday.toISOString()),
          Query.greaterThanEqual("enddate", startOfToday.toISOString()),
        ]
      );
    } catch (error) {
      console.error("Error fetching drugs for today:", error);
      throw new Error("Failed to fetch drugs for today.");
    }
  }

  public async getListOfDrugsbyFilters(
    userId: string,
    searchFilter: {
      drugName?: string;
      startDate?: string;
      endDate?: string;
      timing?: string[];
      status?: string;
      doctor?: string;
    }
  ) {
    try {
      const queries = [Query.equal("user_id", userId)];

      if (searchFilter.drugName) {
        queries.push(
          Query.or([
            Query.startsWith("name", searchFilter.drugName),
            Query.contains("name", searchFilter.drugName),
            Query.endsWith("name", searchFilter.drugName),
          ])
        );
      }

      if (searchFilter.startDate && searchFilter.endDate) {
        queries.push(
          ...this.getDateRangeFilter(
            searchFilter.startDate,
            searchFilter.endDate
          )
        );
      }

      if (searchFilter.timing && searchFilter.timing.length > 0) {
        queries.push(Query.contains("timing", searchFilter.timing));
      }

      if (searchFilter.status) {
        const isTaken = searchFilter.status === "taken";
        queries.push(Query.equal("taken", isTaken));
      }

      if (searchFilter.doctor) {
        queries.push(Query.equal("doctor", searchFilter.doctor));
      }

      return await this.databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.DRUG_COL_ID,
        queries
      );
    } catch (error) {
      console.error("Error fetching drugs by filters:", error);
      throw new Error("Failed to fetch drugs by filters.");
    }
  }

  private getDateRangeFilter(startDate: string, endDate: string) {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    return [
      Query.lessThanEqual("startdate", end.toISOString()),
      Query.greaterThanEqual("enddate", start.toISOString()),
    ];
  }
}
