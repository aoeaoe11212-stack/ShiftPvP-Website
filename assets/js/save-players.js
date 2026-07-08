// api/save-players.js
//
// Serverless function (Vercel) yang menyimpan perubahan players.json
// langsung ke GitHub, DARI SERVER (bukan dari browser).
//
// Kenapa ini lebih reliable daripada token di browser:
//   - Token GitHub disimpan sebagai Environment Variable di Vercel,
//     tidak pernah dikirim ke browser, jadi tidak ada masalah CORS/scope
//     yang aneh-aneh dari sisi client.
//   - Admin panel cukup kirim password sederhana (ADMIN_PASSWORD),
//     bukan token GitHub asli.
//
// SETUP DI VERCEL (wajib sebelum ini bisa jalan):
//   1. Buka project kamu di vercel.com -> Settings -> Environment Variables
//   2. Tambahkan:
//        GITHUB_TOKEN     = fine-grained PAT dengan permission
//                           Contents: Read and write, scope ke repo ini
//        ADMIN_PASSWORD   = password bebas buat gerbang admin panel
//        GH_OWNER         = aoeaoe11212-stack   (opsional, ada default)
//        GH_REPO          = ShiftPvP-Website     (opsional, ada default)
//        GH_BRANCH        = main                 (opsional, ada default)
//        GH_PATH          = data/players.json    (opsional, ada default)
//   3. Redeploy project (Environment Variables baru butuh redeploy
//      supaya kebaca, cukup klik "Redeploy" di tab Deployments)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed. Gunakan POST.' });
    }

    // ---- 1. Cek password admin ----
    const providedSecret = req.headers['x-admin-secret'];
    const expectedSecret = process.env.ADMIN_PASSWORD;

    if (!expectedSecret) {
        return res.status(500).json({
            error: 'Server belum dikonfigurasi: ADMIN_PASSWORD belum diset di Vercel Environment Variables.'
        });
    }
    if (!providedSecret || providedSecret !== expectedSecret) {
        return res.status(401).json({ error: 'Password admin salah atau belum diisi.' });
    }

    // ---- 2. Validasi body ----
    const players = req.body && req.body.players;
    if (!Array.isArray(players)) {
        return res.status(400).json({ error: 'Body harus berisi { players: [...] } berupa array.' });
    }

    // ---- 3. Ambil konfigurasi repo ----
    const owner = process.env.GH_OWNER || 'aoeaoe11212-stack';
    const repo = process.env.GH_REPO || 'ShiftPvP-Website';
    const branch = process.env.GH_BRANCH || 'main';
    const path = process.env.GH_PATH || 'data/players.json';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return res.status(500).json({
            error: 'Server belum dikonfigurasi: GITHUB_TOKEN belum diset di Vercel Environment Variables.'
        });
    }

    const ghHeaders = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };

    try {
        // ---- 4. Ambil SHA file saat ini (wajib untuk update via Contents API) ----
        const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
        const getRes = await fetch(getUrl, { headers: ghHeaders });

        if (!getRes.ok) {
            const errBody = await getRes.text();
            return res.status(getRes.status).json({
                error: `Gagal mengambil file dari GitHub (${getRes.status}): ${errBody}`
            });
        }
        const getJson = await getRes.json();
        const sha = getJson.sha;

        // ---- 5. Commit isi baru ----
        const jsonString = JSON.stringify(players, null, 2);
        const contentBase64 = Buffer.from(jsonString, 'utf-8').toString('base64');

        const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const putRes = await fetch(putUrl, {
            method: 'PUT',
            headers: { ...ghHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: `Update players.json via admin panel (${players.length} players)`,
                content: contentBase64,
                branch: branch,
                sha: sha
            })
        });

        if (!putRes.ok) {
            const errJson = await putRes.json().catch(() => ({}));
            return res.status(putRes.status).json({
                error: `Gagal commit ke GitHub (${putRes.status}): ${errJson.message || 'unknown error'}`
            });
        }

        const putJson = await putRes.json();
        return res.status(200).json({
            success: true,
            commitSha: putJson.commit ? putJson.commit.sha : null,
            playerCount: players.length
        });

    } catch (err) {
        return res.status(500).json({ error: `Server error: ${err.message}` });
    }
}
