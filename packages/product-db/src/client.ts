// packages/product-db/src/client.ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// 1. Configuración de conexión al Docker (Puerto 5433)
const connectionString = "postgresql://admin:123456@127.0.0.1:5433/products?schema=public";

// 2. Creamos el Pool de conexiones de Postgres
const pool = new Pool({ connectionString });

// 3. Creamos el adaptador de Prisma
const adapter = new PrismaPg(pool);

// 4. Instanciamos el cliente usando el adaptador
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter, 
  // log: ['query'], // Descomenta si quieres ver logs SQL
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;