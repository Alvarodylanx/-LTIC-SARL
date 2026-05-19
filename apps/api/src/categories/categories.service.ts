import { Injectable, NotFoundException } from "@nestjs/common";
import { getPool } from "../db.provider";

@Injectable()
export class CategoriesService {
  private get db() { return getPool(); }

  async findAll() {
    const res = await this.db.query(`
      SELECT c.*, COUNT(p.id)::int as "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    return res.rows.map(this.mapRow);
  }

  async findOne(id: number) {
    const res = await this.db.query(`
      SELECT c.*, COUNT(p.id)::int as "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id]);
    if (!res.rows[0]) throw new NotFoundException("Category not found");
    return this.mapRow(res.rows[0]);
  }

  async findBySlug(slug: string) {
    const res = await this.db.query(`
      SELECT c.*, COUNT(p.id)::int as "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      WHERE c.slug = $1
      GROUP BY c.id
    `, [slug]);
    if (!res.rows[0]) throw new NotFoundException("Category not found");
    return this.mapRow(res.rows[0]);
  }

  async create(data: any) {
    const res = await this.db.query(
      `INSERT INTO categories (name_en, name_fr, slug, description_en, description_fr, image_url)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [data.nameEn, data.nameFr, data.slug, data.descriptionEn, data.descriptionFr, data.imageUrl]
    );
    return this.mapRow({ ...res.rows[0], productCount: 0 });
  }

  async update(id: number, data: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    let i = 1;
    if (data.nameEn !== undefined) { fields.push(`name_en=$${i++}`); vals.push(data.nameEn); }
    if (data.nameFr !== undefined) { fields.push(`name_fr=$${i++}`); vals.push(data.nameFr); }
    if (data.slug !== undefined) { fields.push(`slug=$${i++}`); vals.push(data.slug); }
    if (data.descriptionEn !== undefined) { fields.push(`description_en=$${i++}`); vals.push(data.descriptionEn); }
    if (data.descriptionFr !== undefined) { fields.push(`description_fr=$${i++}`); vals.push(data.descriptionFr); }
    if (data.imageUrl !== undefined) { fields.push(`image_url=$${i++}`); vals.push(data.imageUrl); }
    if (!fields.length) return this.findOne(id);
    vals.push(id);
    const res = await this.db.query(
      `UPDATE categories SET ${fields.join(",")} WHERE id=$${i} RETURNING *`,
      vals
    );
    if (!res.rows[0]) throw new NotFoundException("Category not found");
    return this.mapRow({ ...res.rows[0], productCount: 0 });
  }

  async remove(id: number) {
    await this.db.query("DELETE FROM categories WHERE id=$1", [id]);
    return { success: true };
  }

  private mapRow(r: any) {
    return {
      id: r.id,
      nameEn: r.name_en,
      nameFr: r.name_fr,
      slug: r.slug,
      descriptionEn: r.description_en,
      descriptionFr: r.description_fr,
      imageUrl: r.image_url,
      productCount: r.productCount ?? 0,
      createdAt: r.created_at,
    };
  }
}
