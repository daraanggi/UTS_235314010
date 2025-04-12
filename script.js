// Inisialisasi variabel global
let jumlahHobi = 0;
let daftarHobi = [];

// Fungsi utama yang dipanggil saat tombol "Oke" ditekan
function generateHobiInputs() {
    // Ambil nilai input dari form
    const namaDepan = document.getElementById("namaDepan").value.trim();
    const namaBelakang = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();
    const jumlahInput = document.getElementById("jumlahHobi").value.trim();

    // Ambil elemen kontainer dan hasil output
    const inputContainer = document.getElementById("hobiInputs");
    const checkboxContainer = document.getElementById("hobiCheckboxes");
    const hasil = document.getElementById("hasilOutput");


    // Bersihkan konten sebelumnya
    inputContainer.innerHTML = "";
    checkboxContainer.innerHTML = "";
    hasil.classList.add("d-none");
    hasil.innerHTML = "";

    // Validasi nama hanya huruf
    const hurufRegex = /^[a-zA-Z\s]+$/;
    if (!hurufRegex.test(namaDepan) || !hurufRegex.test(namaBelakang)) {
        alert("Nama hanya boleh diisi dengan huruf.");
        return;
    }

    // Validasi format email
    if (!email.endsWith("@gmail.com")) {
        alert("Email harus berformat @gmail.com");
        return;
    }

    // Validasi jumlah hobi
    if (isNaN(jumlahInput) || jumlahInput < 1) {
        alert("Jumlah hobi harus berupa angka dan minimal 1.");
        return;
    }

    // Set semua input awal menjadi readonly agar tidak bisa diubah
    document.getElementById("namaDepan").readOnly = true;
    document.getElementById("namaBelakang").readOnly = true;
    document.getElementById("email").readOnly = true;
    document.getElementById("jumlahHobi").readOnly = true;

    // Konversi ke integer dan sembunyikan tombol awal
    jumlahHobi = parseInt(jumlahInput);
    document.querySelector("#formHobi button").style.display = "none";
    daftarHobi = [];

    // Buat input hobi sesuai jumlah
    for (let i = 0; i < jumlahHobi; i++) {
        const div = document.createElement("div");
        div.className = "mb-2";
        div.innerHTML = `<input type="text" class="form-control" placeholder="Masukkan Hobi ke-${i + 1}" id="hobi${i}">`;
        inputContainer.appendChild(div);
    }

    // Tambahkan tombol "Lanjut Pilih Hobi"
    const btnLanjut = document.createElement("button");
    btnLanjut.className = "btn btn-danger mt-2";
    btnLanjut.textContent = "Lanjut Pilih Hobi";
    btnLanjut.id = "btnLanjut"; // Beri ID agar bisa disembunyikan nanti
    btnLanjut.onclick = function () {
        generateHobiCheckboxes();
        btnLanjut.style.display = "none"; // Sembunyikan setelah diklik
    };
    inputContainer.appendChild(btnLanjut);
}


// Fungsi untuk men-generate checkbox berdasarkan input hobi
function generateHobiCheckboxes() {
    const checkboxContainer = document.getElementById("hobiCheckboxes");
    const hasil = document.getElementById("hasilOutput");

    // Bersihkan isi sebelumnya
    checkboxContainer.innerHTML = "";
    hasil.classList.add("d-none");
    hasil.innerHTML = "";

    daftarHobi = [];
    for (let i = 0; i < jumlahHobi; i++) {
        const val = document.getElementById(`hobi${i}`).value.trim();
        if (!val) {
            alert(`Hobi ke-${i + 1} belum diisi.`);
            return;
        }
        if (/\d/.test(val)) {
            alert(`Hobi ke-${i + 1} tidak boleh mengandung angka.`);
            return;
        }
        daftarHobi.push(val);
    }

    // Buat input hobi tidak bisa diubah lagi
    for (let i = 0; i < jumlahHobi; i++) {
        document.getElementById(`hobi${i}`).readOnly = true;
    }

    // Tampilkan checkbox berdasarkan daftar hobi
    daftarHobi.forEach((hobi, index) => {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${hobi}" id="check${index}">
            <label class="form-check-label" for="check${index}">${hobi}</label>
        `;
        checkboxContainer.appendChild(div);
    });

    // Tambahkan tombol "Tampilkan Hasil"
    const btnHasil = document.createElement("button");
    btnHasil.className = "btn btn-danger mt-2";
    btnHasil.textContent = "Tampilkan Hasil";
    btnHasil.id = "btnHasil"; // Tambah ID supaya bisa disembunyikan
    btnHasil.onclick = function () {
        tampilkanHasil();
        btnHasil.style.display = "none"; // Sembunyikan setelah diklik
    };
    checkboxContainer.appendChild(btnHasil);
}

// Fungsi untuk menampilkan hasil akhir
function tampilkanHasil() {
    const namaDepan = document.getElementById("namaDepan").value.trim();
    const namaBelakang = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();

    let dipilih = [];
    daftarHobi.forEach((hobi, i) => {
        const checkbox = document.getElementById(`check${i}`);
        if (checkbox.checked) {
            dipilih.push(hobi);
        }
    });

    // Tampilkan hasil dalam alert box
    const hasil = document.getElementById("hasilOutput");
    hasil.classList.remove("d-none");
    hasil.innerHTML = `
    <div class="alert alert-success" role="alert" style="background-color: white; color: black;">
    Hallo, nama saya <strong>${namaDepan} ${namaBelakang}</strong>, dengan email <strong>${email}</strong>.<br>
    Saya mempunyai ${jumlahHobi} pilihan hobi yaitu <strong>${daftarHobi.join(", ")}</strong>.<br>
    Dan saya menyukai <strong>${dipilih.length > 0 ? dipilih.join(", ") : "tidak memilih apapun"}</strong>.
    </div>`;  

    // Menonaktifkan checkbox setelah hasil ditampilkan
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.disabled = true;
    });
}

// Aktifkan tooltip Bootstrap saat DOM sudah dimuat
document.addEventListener("DOMContentLoaded", function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

