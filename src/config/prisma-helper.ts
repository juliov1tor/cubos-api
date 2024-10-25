import { PrismaClient } from '@prisma/client'

export const PrismaHelper = {
  client: null as PrismaClient | null,
  uri: null as string | null,

  async connect(uri: string | undefined): Promise<void> {
    if (!uri) {
      throw new Error('Não foi possivel conectar ao banco de dados Postgres.');
    }
    this.uri = uri;
    this.client = new PrismaClient({
      datasources: { db: { url: uri } }
    });
    await this.client.$connect();
    console.log('Conectado ao banco de dados Postgres');
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.$disconnect();
      console.log('Conexão com o banco de dados Postgres fechada ');
      this.client = null;
    }
  },

  getClient(): PrismaClient {
    if (!this.client) {
      throw new Error('PrismaClient is not connected. Please call connect first.');
    }
    return this.client;
  },

  // Prisma automatically maps the fields, so you might not need these map functions.
  // However, if you need to transform the data, you can implement them as needed.
  map: (data: any): any => {
    // Implement any data transformations you need here.
    return data;
  },

  mapCollection: (collection: any[]): any[] => {
    // Implement any data transformations you need here.
    return collection.map(c => PrismaHelper.map(c));
  }
}