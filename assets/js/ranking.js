// js/ranking.js

document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById("leaderboard-body");
    const searchInput = document.getElementById("player-search"); // Opsional: jika ada input search

    // Pastikan tableBody ada di halaman sebelum mengeksekusi
    if (!tableBody) return;

    try {
        // Tampilkan loader via LoaderManager jika ada
        if (window.LoaderManager) window.LoaderManager.show();

        // Ambil data menggunakan fungsi dari players.js
        const players = await window.PlayerManager.fetchLeaderboard();
        
        // Render data ke tabel
        renderTable(players);

    } catch (error) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #ff4a4a; padding: 20px;">
                    ❌ Gagal memuat data ranking. Silakan coba lagi nanti.
                </td>
            </tr>
        `;
    } finally {
        // Matikan loader setelah data selesai diproses/gagal
        if (window.LoaderManager) window.LoaderManager.hide();
    }

    /**
     * Fungsi untuk me-render array player ke dalam HTML tabel
     * @param {Array} playerList 
     */
    function renderTable(playerList) {
        tableBody.innerHTML = ""; // Kosongkan placeholder/loading text

        if (playerList.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px;">Tidak ada data player ditemukan.</td></tr>`;
            return;
        }

        playerList.forEach(player => {
            const row = document.createElement("tr");

            // Berikan class aesthetic/khusus untuk peringkat Top 3
            let rankBadge = `#${player.rank}`;
            let rankClass = "rank-normal";
            
            if (player.rank === 1) {
                rankClass = "rank-gold";
                rankBadge = "🥇 1";
            } else if (player.rank === 2) {
                rankClass = "rank-silver";
                rankBadge = "🥈 2";
            } else if (player.rank === 3) {
                rankClass = "rank-bronze";
                rankBadge = "🥉 3";
            }

            row.innerHTML = `
                <td class="rank-col ${rankClass}">${rankBadge}</td>
                <td class="player-col">
                    <span class="player-name">${player.username}</span>
                </td>
                <td>${player.kills !== undefined ? player.kills : 0}</td>
                <td><span class="points-badge">${player.points !== undefined ? player.points : 0}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Listener Opsional: Jika kamu ingin memasang fitur real-time search di website kamu
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value;
            const filteredPlayers = window.PlayerManager.searchPlayer(query);
            renderTable(filteredPlayers);
        });
    }
});