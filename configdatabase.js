const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(async () => {
    // Jalankan tabel inti
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT UNIQUE,
        phone TEXT UNIQUE,
        password TEXT,
        avatar TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        description TEXT,
        filename TEXT,
        file_type TEXT,
        size INTEGER,
        album TEXT,
        location TEXT,
        tags TEXT,
        is_favorite INTEGER DEFAULT 0,
        is_archived INTEGER DEFAULT 0,
        is_deleted INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        activity TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed 4 Anggota Keluarga jika belum ada
    db.get("SELECT COUNT(*) as count FROM users", [], async (err, row) => {
        if (row.count === 0) {
            const salt = await bcrypt.genSalt(10);
            const defaultPassword = await bcrypt.hash("Keluarga2026!", salt);
            
            const family = [
                { name: 'Ayah', phone: '08111111111', avatar: '👨' },
                { name: 'Ibu', phone: '08222222222', avatar: '👩' },
                { name: 'Kakak', phone: '08333333333', avatar: '🧑' },
                { name: 'Adik', phone: '08444444444', avatar: '👧' }
            ];

            const stmt = db.prepare("INSERT INTO users (nickname, phone, password, avatar) VALUES (?, ?, ?, ?)");
            family.forEach(member => {
                stmt.run(member.name, member.phone, defaultPassword, member.avatar);
            });
            stmt.finalize();
            console.log("Database seeded successfully with 4 family members.");
        }
    });
});

module.exports = db;