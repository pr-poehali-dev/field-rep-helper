const BASE = "https://functions.poehali.dev/f8984c7b-dc18-4489-9b8d-34b1bc457cdf";

export interface Category {
  id: number;
  name: string;
  emoji: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  price: number | null;
  unit: string;
  category_id: number;
  category_name: string;
  category_emoji: string;
  category_slug: string;
}

export const api = {
  getProducts: async (category_id?: number): Promise<Product[]> => {
    const url = category_id ? `${BASE}?category_id=${category_id}` : BASE;
    const res = await fetch(url);
    return res.json();
  },

  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${BASE}?type=categories`);
    return res.json();
  },

  createProduct: async (data: { name: string; price: number | null; category_id: number; unit: string }) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProduct: async (data: { id: number; name: string; price: number | null; category_id: number }) => {
    const res = await fetch(BASE, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProduct: async (id: number) => {
    const res = await fetch(BASE, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.json();
  },
};