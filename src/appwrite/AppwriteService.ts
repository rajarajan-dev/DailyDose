import { Client, Account, ID, Databases, Query } from "react-native-appwrite";
import { DrugDocument, DrugDocumentWithUser } from "../types/DrugDocument";

export class AppwriteService {
  private static instance: AppwriteService;
  private account: Account;
  private client: Client;
  private databases: Databases;

  private DATABASE_ID: string = "67b8107f002be5333ca2";
  private DRUG_COL_ID: string = "67b8119f002689a0fa99";

  private constructor() {
    const client = new Client()
      .setProject("67b42a000009a1c7ef34")
      .setPlatform("com.rajarajan.dailydose");
    this.client = client;
    this.databases = new Databases(client);
    this.account = new Account(client);
  }

  public static getInstance(): AppwriteService {
    if (!AppwriteService.instance) {
      AppwriteService.instance = new AppwriteService();
    }
    return AppwriteService.instance;
  }
  // user sign in
  public async createSession(email: string, password: string) {
    return this.account.createEmailPasswordSession(email, password);
  }

  // user sign up
  public async createAccount(
    email: string,
    password: string,
    username: string
  ) {
    return this.account.create(ID.unique(), email, password, username);
  }

  // get user details
  public async getAccount() {
    return this.account.get();
  }

  // user sign out
  public async closeSession(sessionId: string) {
    this.account.deleteSession(sessionId);
  }

  // update user password
  public async updatePassword(password: string, oldPassword: string) {
    return this.account.updatePassword(password, oldPassword);
  }

  //update recorvery
  public async updateRecovery(
    userId: string,
    secret: string,
    password: string
  ) {
    return this.account.updateRecovery(userId, secret, password);
  }

  // create recovery
  public async createRecovery(email: string, url: string) {
    return this.account.createRecovery(email, url);
  }

  public async addDrugDocument(drug: DrugDocumentWithUser) {
    return this.databases.createDocument(
      this.DATABASE_ID,
      this.DRUG_COL_ID,
      ID.unique(),
      drug
    );
  }

  public async getListOfDrugs(userId: string) {
    const startOfToday = new Date(); // Current date and time
    startOfToday.setUTCHours(0, 0, 0, 0); // Set time to 11:59:59.999 PM
    console.log("Start of today " + startOfToday.toISOString());

    const endOfToday = new Date(); // Current date and time
    endOfToday.setUTCHours(23, 59, 59, 999); // Set time to 11:59:59.999 PM
    console.log("End of today " + endOfToday.toISOString());

    return this.databases.listDocuments(this.DATABASE_ID, this.DRUG_COL_ID, [
      Query.equal("user_id", userId), // Filter by user_id
      Query.lessThanEqual("startdate", endOfToday.toISOString()), // Filter by startdate <= userDate
      Query.greaterThanEqual("enddate", startOfToday.toISOString()), // Filter by endDate >= userDate
    ]);
  }
}
