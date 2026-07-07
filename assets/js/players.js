// js/players.js

// Namespace global untuk menyimpan data player agar bisa diakses di file JS lain
window.PlayerManager = {
    playersData: [],

    /**
     * Mengambil data leaderboard terbaru dari file JSON hasil build
     * @returns {Promise<Array>} Data player yang sudah diurutkan
     */
    async fetchLeaderboard() {
        try {
            const response = await fetch('data/leaderboard.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.playersData = await response.json();
            return this.playersData;
        } catch (error) {
            console.error("Gagal mengambil data player:", error);
            throw error;
        }
    },

    /**
     * Fungsi opsional untuk mencari player berdasarkan username
     * @param {string} query 
     * @returns {Array} Player yang cocok dengan pencarian
     */
    searchPlayer(query) {
        const lowerCaseQuery = query.toLowerCase();
        return this.playersData.filter(player => 
            player.username && player.username.toLowerCase().includes(lowerCaseQuery)
        );
    }
};