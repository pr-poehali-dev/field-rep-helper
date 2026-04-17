"""
CRUD API для товаров и категорий.
GET /products?category_id=1 — список товаров (все или по категории)
GET /categories — список категорий
POST /products — создать товар
PUT /products — обновить товар
DELETE /products — удалить товар (по id в body)
"""

import json
import os
import psycopg2

SCHEMA = "t_p7340170_field_rep_helper"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    params = event.get("queryStringParameters") or {}
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    conn = get_conn()
    cur = conn.cursor()

    try:
        # --- CATEGORIES ---
        if "categories" in path:
            if method == "GET":
                cur.execute(f"SELECT id, name, emoji, slug FROM {SCHEMA}.categories ORDER BY id")
                rows = cur.fetchall()
                data = [{"id": r[0], "name": r[1], "emoji": r[2], "slug": r[3]} for r in rows]
                return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps(data, ensure_ascii=False)}

            if method == "POST":
                cur.execute(
                    f"INSERT INTO {SCHEMA}.categories (name, emoji, slug) VALUES (%s, %s, %s) RETURNING id",
                    (body["name"], body.get("emoji", "📦"), body["slug"])
                )
                new_id = cur.fetchone()[0]
                conn.commit()
                return {"statusCode": 201, "headers": CORS_HEADERS, "body": json.dumps({"id": new_id})}

        # --- PRODUCTS ---
        if method == "GET":
            category_id = params.get("category_id")
            if category_id:
                cur.execute(
                    f"SELECT p.id, p.name, p.price, p.unit, p.category_id, c.name as cat_name, c.emoji, c.slug "
                    f"FROM {SCHEMA}.products p JOIN {SCHEMA}.categories c ON c.id = p.category_id "
                    f"WHERE p.category_id = %s ORDER BY p.name",
                    (category_id,)
                )
            else:
                cur.execute(
                    f"SELECT p.id, p.name, p.price, p.unit, p.category_id, c.name as cat_name, c.emoji, c.slug "
                    f"FROM {SCHEMA}.products p JOIN {SCHEMA}.categories c ON c.id = p.category_id "
                    f"ORDER BY c.id, p.name"
                )
            rows = cur.fetchall()
            data = [
                {"id": r[0], "name": r[1], "price": float(r[2]) if r[2] else None,
                 "unit": r[3], "category_id": r[4], "category_name": r[5],
                 "category_emoji": r[6], "category_slug": r[7]}
                for r in rows
            ]
            return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps(data, ensure_ascii=False)}

        if method == "POST":
            cur.execute(
                f"INSERT INTO {SCHEMA}.products (category_id, name, price, unit) VALUES (%s, %s, %s, %s) RETURNING id",
                (body["category_id"], body["name"], body.get("price"), body.get("unit", "шт"))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"statusCode": 201, "headers": CORS_HEADERS, "body": json.dumps({"id": new_id})}

        if method == "PUT":
            cur.execute(
                f"UPDATE {SCHEMA}.products SET name=%s, price=%s, category_id=%s WHERE id=%s",
                (body["name"], body.get("price"), body["category_id"], body["id"])
            )
            conn.commit()
            return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

        if method == "DELETE":
            cur.execute(f"UPDATE {SCHEMA}.products SET name=name WHERE id=%s RETURNING id", (body["id"],))
            row = cur.fetchone()
            if not row:
                return {"statusCode": 404, "headers": CORS_HEADERS, "body": json.dumps({"error": "not found"})}
            # Soft approach — actually delete
            cur.execute(f"DELETE FROM {SCHEMA}.products WHERE id=%s", (body["id"],))
            conn.commit()
            return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    finally:
        cur.close()
        conn.close()

    return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "method not allowed"})}