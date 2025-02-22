import { Client, Account, ID } from "react-native-appwrite";

export class AppwriteService {
  private static instance: AppwriteService;
  private account: Account;
  private client: Client;
  private constructor() {
    const client = new Client()
      .setProject("67b42a000009a1c7ef34")
      .setPlatform("com.rajarajan.dailydose");
    this.client = client;
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
}
