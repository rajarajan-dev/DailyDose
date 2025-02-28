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
    this.client = new Client()
      .setProject(APPWRITE_CONFIG.PROJECT_ID)
      .setPlatform(APPWRITE_CONFIG.PLATFORM);
    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
  }

  public static getInstance(): AppwriteService {
    return AppwriteService.instance;
  }

  public async createSession(email: string, password: string) {
    // Check if an active session exists
    try {
      const activeSession = await this.getActiveSession();

      if (activeSession && activeSession.total > 0) {
        console.log("Found active session:", activeSession.sessions[0].$id);

        // Ensure the user is authenticated before deleting the session
        try {
          await this.account.deleteSession(activeSession.sessions[0].$id);
          console.log(
            "Closed existing session:",
            activeSession.sessions[0].$id
          );
        } catch (deleteError) {
          console.error("Error closing session:", deleteError);
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log("try to create new session");
    // Create a new session
    const session = await this.account.createEmailPasswordSession(
      email,
      password
    );
    console.log("New session created:", session.$id);
    return session;
  }

  public async getActiveSession() {
    return await this.account.listSessions();
  }

  public async createAccount(
    email: string,
    password: string,
    username: string
  ) {
    return await this.account.create(ID.unique(), email, password, username);
  }

  public async getAccount() {
    return await this.account.get();
  }

  public async closeSession(sessionId: string) {
    try {
      console.log("Close Session Called " + sessionId);
      await this.account.deleteSession(sessionId);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async updatePassword(password: string, oldPassword: string) {
    return await this.account.updatePassword(password, oldPassword);
  }

  public async updateRecovery(
    userId: string,
    secret: string,
    password: string
  ) {
    return await this.account.updateRecovery(userId, secret, password);
  }

  public async createRecovery(email: string, url: string) {
    return await this.account.createRecovery(email, url);
  }

  public async deleteDrugDocument(id: string) {
    return await this.databases.deleteDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      id
    );
  }

  public async getDrugDocumentById(id: string) {
    return await this.databases.getDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      id
    );
  }

  public async updateDrugDocument(drug: DrugDocumentWithUserAndDocId) {
    return await this.databases.updateDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      drug.$id,
      drug
    );
  }

  public async addDrugDocument(drug: DrugDocumentWithUser) {
    const result = await this.databases.createDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      ID.unique(),
      drug
    );
    console.log("Drug document added successfully:", result);
    return result;
  }

  public async getListOfDrugsforUser(userId: string) {
    return await this.databases.listDocuments(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      [Query.equal("user_id", userId), Query.orderDesc("enddate")]
    );
  }

  public async getListOfDrugsforToday(userId: string) {
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
        Query.orderDesc("$updatedAt"),
      ]
    );
  }

  public async getListOfDrugsbyFilters(
    userId: string,
    searchFilter: {
      drugName?: string;
      startDate?: string;
      endDate?: string;
      timing?: string[];
      canBeTaken?: string;
      doctor?: string;
    }
  ) {
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
        ...this.getDateRangeFilter(searchFilter.startDate, searchFilter.endDate)
      );
    }

    if (searchFilter.timing && searchFilter.timing.length > 0) {
      queries.push(Query.contains("timing", searchFilter.timing));
    }

    if (searchFilter.canBeTaken) {
      queries.push(Query.equal("canbetaken", searchFilter.canBeTaken));
    }

    if (searchFilter.doctor) {
      queries.push(Query.equal("doctor", searchFilter.doctor));
    }

    return await this.databases.listDocuments(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.DRUG_COL_ID,
      queries
    );
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
