const calegListElement = document.getElementById('caleg-list');
const calegDetailElement = document.getElementById('caleg-detail');
const sortSelect = document.getElementById('sort');
const filterDapilInput = document.getElementById('filter-dapil');
const backButton = document.getElementById('back-button');

function renderCalegList(data) {
    calegListElement.innerHTML = ''; // Kosongkan daftar sebelum menambahkan data baru

    data.forEach(caleg => {
        const li = document.createElement('li');
        li.textContent = `${caleg.nama} - Dapil: ${caleg.dapil} - Suara: ${caleg.jumlahSuara}`;

        // Tambahkan class sesuai status
        if (caleg.status === "Merah") {
            li.classList.add('status-merah');
        } else if (caleg.status === "Kuning") {
            li.classList.add('status-kuning');
        } else if (caleg.status === "Hijau") {
            li.classList.add('status-hijau');
        } else if (caleg.status === "Oren") {
            li.classList.add('status-oren');
        }

        // Tambahkan event listener untuk menampilkan detail caleg
        li.addEventListener('click', () => showCalegDetail(caleg));

        calegListElement.appendChild(li);
    });
}

function showCalegDetail(caleg) {
    calegListElement.style.display = 'none';
    calegDetailElement.style.display = 'block';

    document.getElementById('caleg-photo').src = caleg.photo;
    document.getElementById('caleg-nama').textContent = caleg.nama;
    document.getElementById('caleg-dapil').textContent = caleg.dapil;
    document.getElementById('caleg-partai').textContent = caleg.partai;
    document.getElementById('caleg-suara').textContent = caleg.jumlahSuara;
    document.getElementById('caleg-basis').textContent = caleg.basisSuara;
    document.getElementById('caleg-kekuatan').textContent = caleg.kekuatanDiBasis;
    document.getElementById('caleg-status').textContent = caleg.statusDiPartai;
    document.getElementById('caleg-profil').textContent = caleg.profileSummary;
    document.getElementById('caleg-pic').textContent = caleg.pic;
}

backButton.addEventListener('click', () => {
    calegDetailElement.style.display = 'none';
    calegListElement.style.display = 'block';
});

function updateList() {
    const sortOrder = sortSelect.value;
    const filterDapil = filterDapilInput.value.trim();

    let filteredData = dataset;

    // Filter by dapil
    if (filterDapil) {
        filteredData = dataset.filter(caleg => caleg.dapil.toString() === filterDapil);
    }

    // Sort by jumlah suara
    filteredData.sort((a, b) => {
        if (sortOrder === 'desc') {
            return b.jumlahSuara - a.jumlahSuara;
        } else {
            return a.jumlahSuara - b.jumlahSuara;
        }
    });

    renderCalegList(filteredData);
}

sortSelect.addEventListener('change', updateList);
filterDapilInput.addEventListener('input', updateList);

updateList();