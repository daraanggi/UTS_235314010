let jumlahHobi = 0;
let daftarHobi = [];

// Fungsi utama dari tombol "Oke"
function generateHobiInputs() {
    const namaDepan = document.getElementById("namaDepan").value.trim();
    const namaBelakang = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();
    const jumlahInput = document.getElementById("jumlahHobi").value.trim();

    const inputContainer = document.getElementById("hobiInputs");
    const checkboxContainer = document.getElementById("hobiCheckboxes");
    const hasil = document.getElementById("hasilOutput");

    // Bersihkan kontainer
    inputContainer.innerHTML = "";
    checkboxContainer.innerHTML = "";
    hasil.classList.add("d-none");
    hasil.innerHTML = "";

    // Validasi
    const hurufRegex = /^[a-zA-Z\s]+$/;
    if (!hurufRegex.test(namaDepan) || !hurufRegex.test(namaBelakang)) {
        alert("Nama hanya boleh diisi dengan huruf.");
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        alert("Email harus berformat @gmail.com");
        return;
    }

    if (isNaN(jumlahInput) || jumlahInput < 1) {
        alert("Jumlah hobi harus berupa angka dan minimal 1.");
        return;
    }

    // Set readonly agar tidak bisa diubah
    document.getElementById("namaDepan").readOnly = true;
    document.getElementById("namaBelakang").readOnly = true;
    document.getElementById("email").readOnly = true;
    document.getElementById("jumlahHobi").readOnly = true;

    jumlahHobi = parseInt(jumlahInput);
    daftarHobi = [];

    for (let i = 0; i < jumlahHobi; i++) {
        const div = document.createElement("div");
        div.className = "mb-2";
        div.innerHTML = `<input type="text" class="form-control" placeholder="Masukkan Hobi ke-${i + 1}" id="hobi${i}">`;
        inputContainer.appendChild(div);
    }

    const btnLanjut = document.createElement("button");
    btnLanjut.className = "btn btn-success mt-2";
    btnLanjut.textContent = "Lanjut Pilih Hobi";
    btnLanjut.onclick = generateHobiCheckboxes;
    inputContainer.appendChild(btnLanjut);
}


// Fungsi untuk menampilkan checkbox berdasarkan input
function generateHobiCheckboxes() {
    const checkboxContainer = document.getElementById("hobiCheckboxes");
    const hasil = document.getElementById("hasilOutput");

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

    daftarHobi.forEach((hobi, index) => {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${hobi}" id="check${index}">
            <label class="form-check-label" for="check${index}">${hobi}</label>
        `;
        checkboxContainer.appendChild(div);
    });

    const btnHasil = document.createElement("button");
    btnHasil.className = "btn btn-primary mt-2";
    btnHasil.textContent = "Tampilkan Hasil";
    btnHasil.onclick = tampilkanHasil;
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

    const hasil = document.getElementById("hasilOutput");
    hasil.classList.remove("d-none");
    hasil.innerText = `Hallo, nama saya ${namaDepan} ${namaBelakang}, dengan email ${email}. Saya mempunyai ${jumlahHobi} pilihan hobi yaitu ${daftarHobi.join(", ")}, dan saya menyukai ${dipilih.length > 0 ? dipilih.join(", ") : "tidak memilih apapun"}.`;
}
