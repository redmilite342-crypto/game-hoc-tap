const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const quizBox = document.getElementById("quiz-box");
const endScreen = document.getElementById("end-screen");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");

// 1. DỮ LIỆU CÂU HỎI (8 câu của bạn)
const questions = [
    { question: "Vì sao thực hiện trách nhiệm xã hội được xem là yếu tố góp phần phát triển bền vững của doanh nghiệp?", answers: ["Vì giúp doanh nghiệp loại bỏ hoàn toàn sự cạnh tranh trên thị trường.", "Vì giúp doanh nghiệp chỉ tập trung vào lợi ích trước mắt.", "Vì tạo dựng uy tín, củng cố niềm tin của các bên liên quan và nâng cao hiệu quả kinh doanh lâu dài.", "Vì thay thế hoàn toàn vai trò quản lí của Nhà nước."], correct: 2 },
    { question: "Một doanh nghiệp vừa đảm bảo lợi nhuận, vừa bảo vệ môi trường, tôn trọng người lao động và đóng góp cho cộng đồng cho thấy điều gì?", answers: ["Doanh nghiệp đang thực hiện trách nhiệm xã hội một cách toàn diện.", "Doanh nghiệp đang giảm khả năng cạnh tranh.", "Doanh nghiệp chỉ chú trọng hình ảnh bên ngoài.", "Doanh nghiệp không đặt mục tiêu kinh doanh."], correct: 0 },
    { question: "Nội dung nào sau đây không thuộc trách nhiệm xã hội của doanh nghiệp?", answers: ["Đảm bảo hoạt động kinh doanh hiệu quả.", "Tuân thủ các quy định của pháp luật.", "Chủ động thực hiện các hoạt động có lợi cho cộng đồng.", "Tối đa hóa lợi nhuận bằng mọi cách bất kể hậu quả xã hội."], correct: 3 },
    { question: "Công ty A luôn chú trọng cải tiến công nghệ để tạo ra sản phẩm chất lượng, đồng thời đảm bảo việc làm ổn định và thu nhập phù hợp cho người lao động. Việc làm trên thể hiện doanh nghiệp đã thực hiện tốt trách nhiệm nào?", answers: ["Trách nhiệm pháp lí và nhân văn.", "Trách nhiệm kinh tế và đạo đức.", "Trách nhiệm chính trị và pháp lí.", "Trách nhiệm cạnh tranh và quảng bá."], correct: 1 },
    { question: "Hành động nào sau đây thể hiện doanh nghiệp thực hiện tốt trách nhiệm xã hội?", answers: ["Sử dụng nguyên liệu gây hại cho môi trường để giảm chi phí.", "Bảo đảm quyền lợi chính đáng của người lao động.", "Che giấu thông tin về sản phẩm.", "Trốn đóng bảo hiểm cho nhân viên."], correct: 1 },
    { question: "Công ty C áp dụng trí tuệ nhân tạo vào sản xuất giúp tăng năng suất. Một số lao động có nguy cơ mất việc nên công ty tổ chức đào tạo lại để họ chuyển sang vị trí mới. Việc làm này thể hiện:", answers: ["Doanh nghiệp từ bỏ mục tiêu lợi nhuận.", "Sự kết hợp giữa đổi mới kinh doanh và trách nhiệm với người lao động.", "Doanh nghiệp không biết sử dụng công nghệ.", "Doanh nghiệp vi phạm quyền tự do kinh doanh."], correct: 1 },
    { question: "Một công ty sản xuất thực phẩm phát hiện một lô hàng có nguy cơ không đảm bảo an toàn cho người tiêu dùng. Công ty quyết định thu hồi sản phẩm, công khai thông tin và chịu chi phí xử lí dù có thể ảnh hưởng đến lợi nhuận. Hành động này thể hiện:", answers: ["Doanh nghiệp ưu tiên bảo vệ hình ảnh thương hiệu nhằm duy trì khả năng cạnh tranh trên thị trường.", "Doanh nghiệp thực hiện trách nhiệm xã hội khi cân bằng giữa lợi ích kinh doanh, quyền lợi khách hàng và uy tín lâu dài.", "Doanh nghiệp thực hiện nghĩa vụ pháp lí vì mọi trường hợp sản phẩm lỗi đều bắt buộc phải thu hồi.", "Doanh nghiệp chấp nhận giảm lợi ích kinh tế trước mắt để thể hiện trách nhiệm đạo đức với xã hội."], correct: 1 },
    { question: "Doanh nghiệp tổ chức các hoạt động từ thiện, hỗ trợ người có hoàn cảnh khó khăn thể hiện trách nhiệm nào?", answers: ["Trách nhiệm nhân văn.", "Trách nhiệm kinh tế.", "Trách nhiệm pháp lí.", "Trách nhiệm sản xuất."], correct: 0 }
];

// 2. BIẾN TRẠNG THÁI GAME
let currentQuestionIndex = 0;
let score = 0;
let isQuizMode = false;
let gameActive = true;

// Đối tượng Con Cá bằng Đồ họa Vector
let fish = {
    x: 100,
    y: 200,
    radius: 16,
    gravity: 0.25,
    velocity: 0,
    jump: -4.5
};

// Mỏm đá chướng ngại vật chứa câu hỏi
let obstacle = {
    x: canvas.width + 50,
    y: 150,
    width: 40,
    height: 100,
    speed: 2.5
};

// Điều khiển cá bơi lên bằng chuột hoặc phím Cách (Space)
window.addEventListener("keydown", (e) => { if(e.code === "Space" && !isQuizMode) fish.velocity = fish.jump; });
canvas.addEventListener("click", () => { if(!isQuizMode) fish.velocity = fish.jump; });

function update() {
    if (!gameActive || isQuizMode) return;

    // Logic vật lý chuyển động rơi tự do của cá
    fish.velocity += fish.gravity;
    fish.y += fish.velocity;

    // Giới hạn không cho cá bơi lệch ra khỏi màn hình đại dương
    if (fish.y + fish.radius > canvas.height) fish.y = canvas.height - fish.radius;
    if (fish.y - fish.radius < 0) fish.y = fish.radius;

    // Di chuyển chướng ngại vật từ phải sang trái
    obstacle.x -= obstacle.speed;

    // Kiểm tra va chạm giữa Cá và Chướng ngại vật
    if (obstacle.x < fish.x + fish.radius && obstacle.x + obstacle.width > fish.x - fish.radius) {
        if (fish.y + fish.radius > obstacle.y && fish.y - fish.radius < obstacle.y + obstacle.height) {
            triggerQuiz(); // Chạm đá -> Bật bảng câu hỏi ngay lập tức
        }
    }

    // Nếu chướng ngại vật trôi qua màn hình mà chưa va chạm (học sinh né được)
    if (obstacle.x + obstacle.width < 0) {
        resetObstacle();
    }
}

function draw() {
    // Xóa khung hình cũ để vẽ chuyển động mới mượt mà
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Vẽ chướng ngại vật (Mỏm đá bí ẩn chứa tri thức)
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 8);
    ctx.fill();
    // Vẽ ký hiệu "?" trên chướng ngại vật
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Inter";
    ctx.fillText("?", obstacle.x + 14, obstacle.y + 55);

    // 2. Vẽ đồ họa Con Cá Hoạt Hình màu cam đáng yêu
    ctx.fillStyle = "#f97316"; // Màu cam
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();
    // Vẽ Đuôi cá
    ctx.beginPath();
    ctx.moveTo(fish.x - fish.radius, fish.y);
    ctx.lineTo(fish.x - fish.radius - 12, fish.y - 10);
    ctx.lineTo(fish.x - fish.radius - 12, fish.y + 10);
    ctx.closePath();
    ctx.fill();
    // Vẽ Mắt cá tròn xoe xinh xắn
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(fish.x + 6, fish.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(fish.x + 7, fish.y - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Tạo vòng lặp đồ họa 60 khung hình/giây
}

function resetObstacle() {
    obstacle.x = canvas.width + Math.random() * 200 + 100;
    obstacle.y = Math.random() * (canvas.height - 150) + 25; // Đổi ngẫu nhiên chiều cao mỏm đá
}

// Hàm kích hoạt hiển thị câu hỏi trắc nghiệm
function triggerQuiz() {
    isQuizMode = true;
    quizBox.style.display = "block";
    
    // Cập nhật thanh tiến trình chạy từ 1 đến 8 câu
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `Câu hỏi ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn-option");
        button.onclick = () => checkAnswer(index, currentQuestion.correct);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, correctIndex) {
    const buttons = optionsContainer.getElementsByTagName("button");
    
    // Khóa nút bấm
    for (let btn of buttons) btn.disabled = true;

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].style.backgroundColor = "#ecfdf5";
        buttons[selectedIndex].style.borderColor = "#10b981";
        buttons[selectedIndex].style.color = "#065f46";
        score++;
        // Đồ họa pháo hoa rực rỡ khi trả lời đúng xuất sắc
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else {
        buttons[selectedIndex].style.backgroundColor = "#fef2f2";
        buttons[selectedIndex].style.borderColor = "#ef4444";
        buttons[selectedIndex].style.color = "#991b1b";
        // Hiện đáp án đúng màu xanh lá
        buttons[correctIndex].style.backgroundColor = "#ecfdf5";
        buttons[correctIndex].style.borderColor = "#10b981";
    }

    // Đợi 1.5 giây để học sinh nhìn nhận đáp án rồi tự động bơi tiếp câu tiếp theo
    setTimeout(() => {
        quizBox.style.display = "none";
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            resetObstacle();
            isQuizMode = false; // Cá tiếp tục bơi đi tìm đá mới
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    gameActive = false;
    quizBox.style.display = "none";
    endScreen.style.display = "block";
    document.getElementById("end-score").innerHTML = `Bạn đã giúp Cá Vàng vượt qua tất cả chướng ngại vật đại dương! <br>Số điểm tri thức đạt được: <strong>${score}/${questions.length}</strong>`;
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    fish.y = 200;
    fish.velocity = 0;
    resetObstacle();
    endScreen.style.display = "none";
    isQuizMode = false;
    gameActive = true;
}

// Khởi chạy vòng lặp đồ họa chính của trò chơi ngay khi tải trang
gameLoop();
