document.addEventListener("DOMContentLoaded", function() {
    const selectBtn = document.getElementById("selectP12File"); // твоя кнопка
    const fileInput = document.createElement("input"); // скрытый input
    const fileName = document.createElement("p");

    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.style.display = "none";
    fileName.className = "text-muted";
    fileName.style.marginTop = "10px";

    // Вставляем элементы после кнопки
    selectBtn.insertAdjacentElement("afterend", fileInput);
    selectBtn.insertAdjacentElement("afterend", fileName);

    // --- Создаём модальное окно ---
    const modalHTML = `
        <div id="passwordModal" class="modal" style="display:none;">
            <div class="modal-dialog" style="max-width:400px;margin:10% auto;">
                <div class="modal-content">
                    <div class="modal-header">
                        <b>Подтверждение пароля</b>
                        <span id="closeModal" style="float:right;cursor:pointer;">&times;</span>
                    </div>
                    <div class="modal-body text-center">
                        <p>Введите пароль для доступа к ключу:</p>
                        <input type="password" id="keyPassword" class="form-control" placeholder="Пароль">
                    </div>
                    <div class="modal-footer text-center">
                        <button id="confirmBtn" class="btn btn-success">Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const passwordModal = document.getElementById("passwordModal");
    const closeModal = document.getElementById("closeModal");
    const confirmBtn = document.getElementById("confirmBtn");
    const keyPassword = document.getElementById("keyPassword");

    // --- Нажатие на кнопку "Выберите ключ" ---
    selectBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // --- Когда выбран файл ---
    fileInput.addEventListener("change", function() {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (!file.name.endsWith(".txt")) {
                alert("Пожалуйста, выберите файл с расширением .txt");
                fileInput.value = "";
                return;
            }

            fileName.textContent = "Выбран файл: " + file.name;

            // Имитация запроса пароля
            showModal();
        }
    });

    function showAllert() {
        
    }

    // --- Показ и скрытие модалки ---
    function showModal() {
        passwordModal.style.display = "block";
    }

    closeModal.addEventListener("click", () => {
        passwordModal.style.display = "none";
        keyPassword.value = "";
    });

    window.addEventListener("click", (e) => {
        if (e.target === passwordModal) {
            passwordModal.style.display = "none";
        }
    });

    // --- Подтверждение пароля ---
    confirmBtn.addEventListener("click", () => {
        const pass = keyPassword.value.trim();
        if (pass !== "Aa12345!") {
            showAllert()
            return;
        }

        passwordModal.style.display = "none";
        if (localStorage.getItem("userData")){
            window.location.href ="../Вход второе подтверждение пароля/auth_confirm.html"
        } else {
            window.location.href ="../Вход после ЭЦП/register.html"
        }
        
        keyPassword.value = "";
    });
});