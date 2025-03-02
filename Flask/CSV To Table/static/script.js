document.addEventListener("DOMContentLoaded", function () {
    let tableBody = document.getElementById("tableBody");
    let searchInput = document.getElementById("searchInput");
    let loadingIndicator = document.getElementById("loading");

    let page = 2;
    let loading = false;
    let endOfData = false;
    let allData = [];
    let fuse;  // محرك البحث الفوري

    // تحميل المزيد من البيانات عند التمرير
    async function loadMoreData() {
        if (loading || endOfData) return;
        loading = true;
        loadingIndicator.style.display = "block";

        let response = await fetch(`/get_data?page=${page}`);
        let data = await response.json();

        if (data.length === 0) {
            endOfData = true;
            loadingIndicator.style.display = "none";
            return;
        }

        allData.push(...data);
        updateSearchIndex();  // تحديث الفهرس عند تحميل بيانات جديدة
        appendRows(data);

        page++;
        loading = false;
        loadingIndicator.style.display = "none";
    }

    // تحديث فهرس البحث عند تحميل المزيد من البيانات
    function updateSearchIndex() {
        fuse = new Fuse(allData, {  // إنشاء الفهرس
            keys: ["0", "1", "2", "3", "4"],  // البحث في جميع الأعمدة
            threshold: 0.3  // يسمح بالبحث حتى لو كان هناك خطأ بسيط في الإدخال
        });
    }

    // إضافة الصفوف إلى الجدول
    function appendRows(data) {
        let fragment = document.createDocumentFragment();
        data.forEach(rowData => {
            let row = document.createElement("tr");
            rowData.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                row.appendChild(td);
            });
            fragment.appendChild(row);
        });
        tableBody.appendChild(fragment);
    }

    // البحث الفوري باستخدام Fuse.js
    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.trim();

        if (filter === "") {
            tableBody.innerHTML = "";
            appendRows(allData.slice(0, 1000));  // عرض أول 1000 صف فقط عند تفريغ البحث
            return;
        }

        let results = fuse.search(filter).map(result => result.item);
        tableBody.innerHTML = "";
        appendRows(results);
    });

    // التمرير إلى أسفل الصفحة -> تحميل المزيد تلقائيًا
    window.addEventListener("scroll", function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            loadMoreData();
        }
    });

    // تحميل الفهرس الأولي عند بدء الصفحة
    loadMoreData();
});
