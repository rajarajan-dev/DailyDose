import { Client, Account, ID } from "react-native-appwrite";

class AppwriteService {
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
  public async createSession(email: string, password: string) {
    return this.account.createSession(email, password);
  }
  public async createAccount(email: string, password: string) {
    return this.account.create(email, password);
  }
  public async getAccount() {
    return this.account.get();
  }
  public async updateAccount(name: string) {
    return this.account.update(name);
  }
  public async deleteAccount() {
    return this.account.delete();
  }
  public async createDocument(collectionId: string, data: any) {
    return this.client.database.createDocument(collectionId, data);
  }
  public async getDocument(collectionId: string, documentId: string) {
    return this.client.database.getDocument(collectionId, documentId);
  }
  public async listDocuments(collectionId: string) {
    return this.client.database.listDocuments(collectionId);
  }
  public async updateDocument(
    collectionId: string,
    documentId: string,
    data: any
  ) {
    return this.client.database.updateDocument(collectionId, documentId, data);
  }
  public async deleteDocument(collectionId: string, documentId: string) {
    return this.client.database.deleteDocument(collectionId, documentId);
  }
  public async createFile(file: any) {
    return this.client.storage.createFile(file);
  }
  public async getFile(fileId: string) {
    return this.client.storage.getFile(fileId);
  }
  public async listFiles() {
    return this.client.storage.listFiles();
  }
  public async updateFile(fileId: string, file: any) {
    return this.client.storage.updateFile(fileId, file);
  }
  public async deleteFile(fileId: string) {
    return this.client.storage.deleteFile(fileId);
  }
}
