const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const quizBox = document.getElementById("quiz-box");
const endScreen = document.getElementById("end-screen");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");

// 1. DỮ LIỆU CÂU HỎI TRẮC NGHIỆM KHÔNG ĐỔI
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

let currentQuestionIndex = 0;
let score = 0;
let isQuizMode = false;
let gameActive = true;

// Môi trường đồ họa nâng cấp: Tạo mảng chứa các bong bóng nước sặc sỡ rơi/bay tự do
let bubbles = [];
for (let i = 0; i < 25; i++) {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
    });
}

let fish = { x: 120, y: 200, radius: 18, gravity: 0.25, velocity: 0, jump: -4.8 };
// Chướng ngại vật đổi màu vàng neon nổi bật sặc sỡ
let obstacle = { x: canvas.width + 100, y: 150, width: 45, height: 110, speed: 3 };

window.addEventListener("keydown", (e) => { if(e.code === "Space" && !isQuizMode) fish.velocity = fish.jump; });
canvas.addEventListener("click", () => { if(!isQuizMode) fish.velocity = fish.jump; });

function update() {
    if (!gameActive || isQuizMode) return;

    fish.velocity += fish.gravity;
    fish.y += fish.velocity;

    if (fish.y + fish.radius > canvas.height) fish.y = canvas.height - fish.radius;
    if (fish.y - fish.radius < 0) fish.y = fish.radius;

    obstacle.x -= obstacle.speed;

    // Di chuyển các hiệu ứng hạt bong bóng nước lung linh
    bubbles.forEach(b => {
        b.y -= b.speed;
        if (b.y < -10) {
            b.y = canvas.height + 10;
            b.x = Math.random() * canvas.width;
        }
    });

    if (obstacle.x < fish.x + fish.radius && obstacle.x + obstacle.width > fish.x - fish.radius) {
        if (fish.y + fish.radius > obstacle.y && fish.y - fish.radius < obstacle.y + obstacle.height) {
            triggerQuiz();
        }
    }

    if (obstacle.x + obstacle.width < 0) {
        resetObstacle();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ĐỒ HỌA NỀN: Vẽ các hạt bong bóng nước lung linh màu xanh pastel sặc sỡ
    bubbles.forEach(b => {
        ctx.fillStyle = `rgba(14, 165, 233, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // 1. VẼ CHƯỚNG NGẠI VẬT: Mỏm đá đổi sang sắc màu Tím Neon sặc sỡ phát sáng
    ctx.fillStyle = "#a855f7";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#a855f7"; // Hiệu ứng đồ họa phát sáng viền mỏm đá
    ctx.beginPath();
    ctx.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 12);
    ctx.fill();
    
    // Vẽ chữ "?" sặc sỡ trên mỏm đá tri thức
    ctx.shadowBlur = 0; // Tắt phát sáng để chữ rõ ràng
    ctx.fillStyle = "#fef08a"; // Màu vàng tươi tương phản cao
    ctx.font = "bold 24px Inter";
    ctx.fillText("?", obstacle.x + 16, obstacle.y + 65);

    // 2. VẼ ĐỒ HỌA CHÚ CÁ CẦU VỒNG SẶC SỠ (Nâng cấp nhiều vây đẹp mắt)
    // Thân cá màu đỏ cam sặc sỡ phát sáng neon
    ctx.fillStyle = "#ff4757";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff4757";
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Vây đuôi cá lộng lẫy màu hồng sặc sỡ rực rỡ
    ctx.fillStyle = "#ff6b81";
    ctx.beginPath();
    ctx.moveTo(fish.x - fish.radius + 2, fish.y);
    ctx.quadraticCurveTo(fish.x - fish.radius - 15, fish.y - 18, fish.x - fish.radius - 20, fish.y - 15);
    ctx.lineTo(fish.x - fish.radius - 15, fish.y);
    ctx.lineTo(fish.x - fish.radius - 20, fish.y + 15);
    ctx.quadraticCurveTo(fish.x - fish.radius - 15, fish.y + 18, fish.x - fish.radius + 2, fish.y);
    ctx.closePath();
    ctx.fill();

    // Vây lưng màu vàng chanh sặc sỡ tăng tính bắt mắt
    ctx.fillStyle = "#eccc68";
    ctx.beginPath();
    ctx.moveTo(fish.x - 5, fish.y - fish.radius + 2);
    ctx.quadraticCurveTo(fish.x - 12, fish.y - fish.radius - 10, fish.x - 18, fish.y - fish.radius + 4);
    ctx.fill();

    // Mắt cá to tròn long lanh tri thức
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(fish.x + 6, fish.y - 4, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2f3542";
    ctx.beginPath();
    ctx.arc(fish.x + 7.5, fish.y - 4, 2, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function resetObstacle() {
    obstacle.x = canvas.width + Math.random() * 250 + 100;
    obstacle.y = Math.random() * (canvas.height - 160) + 25;
}

function triggerQuiz() {
    isQuizMode = true;
    quizBox.style.display = "block";
    
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
    for (let btn of buttons) btn.disabled = true;

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].style.backgroundColor = "#d1fae5";
        buttons[selectedIndex].style.borderColor = "#10b981";
        buttons[selectedIndex].style.color = "#065f46";
        score++;
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
        buttons[selectedIndex].style.backgroundColor = "#fee2e2";
        buttons[selectedIndex].style.borderColor = "#ef4444";
        buttons[selectedIndex].style.color = "#991b1b";
        buttons[correctIndex].style.backgroundColor = "#d1fae5";
        buttons[correctIndex].style.borderColor = "#10b981";
    }

    setTimeout(() => {
        quizBox.style.display = "none";
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            resetObstacle();
            isQuizMode = false;
        } else {
            endGame();
        }
    }, 1600);
}

function endGame() {
    gameActive = false;
