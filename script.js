const products = [
    {name: "Cà phê sữa", price: 20000, category: "cafe", image: "images/bac-xiu.jpg"},
    {name: "Cà phê đen", price: 10000, category: "cafe", image: "images/vnese_coffee_master_895a0e046c6946d183a4f09cbb6738e7.jpg"},
    {name: "Cà phê sữa tươi", price: 15000, category: "cafe", image: "images/cach-lam-ca-phe-sua-tuoi-ngon-bo-re-de-thuc-hien-tai-nha-202112020947015761.jpg"},
    {name: "Cà phê muối", price: 25000, category: "cafe", image: "images/caphemuoi.jpg"},
    {name: "Trà sữa trân châu", price: 30000, category: "trasua", image: "images/4eaf2e879a27bc410e2fbf27a5383c54.jpg"},
    {name: "Trà sữa matcha latte", price: 35000, category: "trasua", image: "images/487546607_1091510776339447_1340770559312307610_n.jpg"},
    {name: "Trà sữa olong", price: 31000, category: "trasua", image: "images/Cach-lam-tra-sua-bang-tra-o-long-tea-plus-don-gian-tai-nha.jpg"},
    {name: "Nước chanh dây", price: 28000, category: "nuocep", image: "images/nuoc-cot-chanh-day.jpg"},
    {name: "Trà sữa socola", price: 32000, category: "trasua", image: "images/tra-sua-socola.jpg"},
    {name: "Hồng trà", price: 25000, category: "tra", image: "images/hongtra.jpg"},
    {name: "Trà tắc", price: 20000, category: "tra", image: "images/Tac+mat+ong-620x620.jpg"},
    {name: "Trà sữa thái đỏ", price: 30000, category: "trasua", image: "images/trasuathaido.jpg"},
    {name: "Trà chanh", price: 19000, category: "tra", image: "images/trachanh.jpg"},
    {name: "Hồng trà dưa lưới", price: 28000, category: "tra", image: "images/hongtradualuoi.jpg"},
    {name: "Trà mãng cầu", price: 29000, category: "tra", image: "images/tramangcau.jpg"},
    {name: "Nước ép lựu", price: 26000, category: "nuocep", image: "images/Pomegranatejuice.jpg"},
    {name: "Nước ép dưa hấu", price: 21000, category: "nuocep", image: "images/nuocepduahau.jpg"},
    {name: "Nước ép Xoài", price: 22000, category: "nuocep", image: "images/nuocepxoai.jpg"},
    {name: "Bạc xĩu", price: 25000, category: "cafe", image: "images/cafesuatuoi.jpg"},
    {name: "Nước ép bưởi", price: 21000, category: "nuocep", image: "images/nuoc-ep-buoi-165.jpg"},

];


// Hệ số giá theo size
const sizePrice = { "Nhỏ": 0, "Vừa": 5000, "Lớn": 10000 };

// Hệ số giá topping trà sữa
const toppingPrice = {"Không": 0, "Trân châu": 5000, "Thạch": 4000 };

// Cafe/nước ép: chọn đá nhiều, đá ít, không đá (không tăng giá)
const iceOptions = ["Đá nhiều", "Đá ít", "Không đá"];

let cart = [];

function displayProducts(items) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    items.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        // Tạo phần chọn topping/đá
        let optionHTML = "";
        if (product.category === "trasua") {
            optionHTML = `
                <label>Topping:
                    <select id="topping-${product.name}">
			<option value="Không">Không (+0)</option>
                        <option value="Trân châu">Trân châu (+5k)</option>
                        <option value="Thạch">Thạch (+4k)</option>
                    </select>
                </label>
            `;
        } else {
            optionHTML = `
                <label>Đá:
                    <select id="topping-${product.name}">
                        ${iceOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </label>
            `;
        }

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:150px; height:150px; object-fit:cover;">
            <h3>${product.name}</h3>
            <p>Giá cơ bản: ${product.price}₫</p>
            <label>Size:
                <select id="size-${product.name}">
                    <option value="Nhỏ">S</option>
                    <option value="Vừa">M (+5k)</option>
                    <option value="Lớn">L (+10k)</option>
                </select>
            </label>
            ${optionHTML}
            <p>Giá hiện tại: <span id="price-${product.name}">${product.price}₫</span></p>
            <button class="add-cart" onclick="addToCart('${product.name}')">Thêm vào giỏ</button>
        `;
        container.appendChild(div);

        // Cập nhật giá khi thay đổi size hoặc topping
        const sizeSelect = document.getElementById(`size-${product.name}`);
        const toppingSelect = document.getElementById(`topping-${product.name}`);

        sizeSelect.addEventListener("change", () => updatePriceDisplay(product.name, product.price, product.category));
        toppingSelect.addEventListener("change", () => updatePriceDisplay(product.name, product.price, product.category));
    });
}

// Cập nhật hiển thị giá theo size/topping
function updatePriceDisplay(name, basePrice, category) {
    const size = document.getElementById(`size-${name}`)?.value || "Nhỏ";
    const topping = document.getElementById(`topping-${name}`)?.value || (category === "trasua" ? "Không" : "Đá nhiều");

    let price = basePrice;
    price += sizePrice[size] || 0;

    if (category === "trasua") {
        price += toppingPrice[topping] || 0;
    }

    document.getElementById(`price-${name}`).textContent = price + "₫";
}

function addToCart(name) {
    const product = products.find(p => p.name === name);
    const size = document.getElementById(`size-${name}`)?.value || "Nhỏ";
    const topping = document.getElementById(`topping-${name}`)?.value || (product.category === "trasua" ? "Không" : "Đá nhiều");

    let price = product.price;
    price += sizePrice[size] || 0;
    if (product.category === "trasua") {
        price += toppingPrice[topping] || 0;
    }

    cart.push({...product, size, topping, price});
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.size}${item.topping ? ', ' + item.topping : ''}) - ${item.price}₫`;

        // Tạo nút xóa
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "-";
        removeBtn.style.marginLeft = "10px";
        removeBtn.style.color = "red";
        removeBtn.style.cursor = "pointer";

        // Gắn sự kiện xóa
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);  // Xóa món khỏi giỏ
            updateCart();           // Cập nhật lại giỏ hàng
        });

        li.appendChild(removeBtn);
        cartItems.appendChild(li);

        total += item.price;
    });

    document.getElementById("total").textContent = total;
}

function suggestDrink() {
    const randomIndex = Math.floor(Math.random() * products.length);
    const item = products[randomIndex];

    document.getElementById("suggested-drink").textContent =
        `Bạn nên thử: ${item.name}`;

    document.getElementById("suggested-image").src = item.image;
    document.getElementById("suggested-image").alt = item.name;
}
// Phân loại sản phẩm theo category khi click
function showCategory(category) {
    let filteredProducts;

    if (category === "all") {
        filteredProducts = products; // hiển thị tất cả
    } else {
        filteredProducts = products.filter(p => p.category === category); // lọc theo category
    }

    displayProducts(filteredProducts); // gọi lại hàm hiển thị
}
// Tìm kiếm sản phẩm theo tên
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    // Lọc sản phẩm dựa trên query và category hiện tại (nếu muốn giữ filter)
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
});

// Gắn sự kiện click cho nút phân loại (nếu muốn dùng JS thay vì onclick trong HTML)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".categories button").forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-category");
            showCategory(category);
        });
    });
});

// Hiển thị tất cả sản phẩm ban đầu
displayProducts(products);