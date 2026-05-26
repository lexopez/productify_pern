import { db } from "./index.js";
import {
  users,
  products,
  comments,
  type NewProduct,
  type NewUser,
  type NewComment,
} from "./schema.js";
import { eq } from "drizzle-orm";

// user queries
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ?? null;
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw new Error("User not found with id: " + id);
  }
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

export const upsertUser = async (data: NewUser) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning();
  return user;
};

// product queries

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  // const result = await db
  //   .select()
  //   .from(products)
  //   .leftJoin(users, eq(products.userId, users.id))
  //   .orderBy(desc(products.createdAt)); // desc means: you will see the latest products first

  const result = await db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)], // desc means: you will see the latest products first
    // the square brackets are required because Drizzle ORM's orderBy expects an array, even for a single column.
  });

  return result;
};

export const getProductById = async (id: string) => {
  // const product = await db
  //   .select()
  //   .from(products)
  //   .leftJoin(users, eq(products.userId, users.id))
  //   .leftJoin(comments, eq(products.id, comments.productId))
  //   .where(eq(products.id, id))
  //   .orderBy(desc(comments.createdAt));
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });

  return product ?? null;
};

export const getProductsByUserId = async (userId: string) => {
  const result = await db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
  return result ?? null;
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error("Product not found with id: " + id);
  }
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error("Product not found with id: " + id);
  }
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return product;
};

// comment queries

export const createComment = async (data: NewComment) => {
  console.log("data:   ", data);
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};

export const deleteComment = async (id: string) => {
  const existingComment = await getCommentById(id);
  if (!existingComment) {
    throw new Error("Comment not found with id: " + id);
  }

  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();
  return comment;
};

export const getCommentById = async (id: string) => {
  const [comment] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .leftJoin(users, eq(comments.userId, users.id));
  return comment ?? null;
};
