// js/loader.js

window.LoaderManager = {
    // Cari elemen loader di HTML kamu
    getLoaderElement() {
        return document.getElementById("ranking-loader");
    },

    /**
     * Menampilkan efek loading
     */
    show() {
        const loader = this.getLoaderElement();
        if (loader) {
            loader.style.display = "block";
            loader.style.opacity = "1";
        }
    },

    /**
     * Menyembunyikan efek loading dengan transisi smooth
     */
    hide() {
        const loader = this.getLoaderElement();
        if (loader) {
            loader.style.opacity = "0";
            // Beri waktu animasi fade-out CSS selesai (300ms) sebelum di-hide total
            setTimeout(() => {
                loader.style.display = "none";
            }, 300);
        }
    }
};