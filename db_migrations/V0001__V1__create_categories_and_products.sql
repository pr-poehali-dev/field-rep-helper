
CREATE TABLE t_p7340170_field_rep_helper.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) NOT NULL DEFAULT '📦',
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p7340170_field_rep_helper.products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES t_p7340170_field_rep_helper.categories(id),
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10,2),
  unit VARCHAR(20) DEFAULT 'шт',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p7340170_field_rep_helper.categories (name, emoji, slug) VALUES
  ('Бытовая химия', '🧴', 'chemistry'),
  ('Продукты питания', '🥫', 'food');

INSERT INTO t_p7340170_field_rep_helper.products (category_id, name, price, unit) VALUES
  (1, 'Порошок универсальный 1кг', 189, 'шт'),
  (1, 'Гель для стирки цветного 1л', 215, 'шт'),
  (1, 'Кондиционер для белья 1л', 175, 'шт'),
  (1, 'Чистящее средство для ванной 500мл', 129, 'шт'),
  (1, 'Средство для мытья полов 1л', 145, 'шт'),
  (1, 'Гель для посуды 500мл', 95, 'шт'),
  (2, 'Тушёнка говяжья 325г', 189, 'шт'),
  (2, 'Горбуша натуральная 250г', 145, 'шт'),
  (2, 'Гречка ядрица 900г', 89, 'шт'),
  (2, 'Рис длиннозёрный 900г', 79, 'шт'),
  (2, 'Масло подсолнечное рафинированное 1л', 139, 'шт'),
  (2, 'Майонез Провансаль 400мл', 115, 'шт');
