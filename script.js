// 1. Dữ liệu 8 câu hỏi trắc nghiệm của bạn
const questions = [
    {
        question: "Vì sao thực hiện trách nhiệm xã hội được xem là yếu tố góp phần phát triển bền vững của doanh nghiệp?",
        answers: [
            "Vì giúp doanh nghiệp loại bỏ hoàn toàn sự cạnh tranh trên thị trường.",
            "Vì giúp doanh nghiệp chỉ tập trung vào lợi ích trước mắt.",
            "Vì tạo dựng uy tín, củng cố niềm tin của các bên liên quan và nâng cao hiệu quả kinh doanh lâu dài.",
            "Vì thay thế hoàn toàn vai trò quản lí của Nhà nước."
        ],
        correct: 2
    },
    {
        question: "Một doanh nghiệp vừa đảm bảo lợi nhuận, vừa bảo vệ môi trường, tôn trọng người lao động và đóng góp cho cộng đồng cho thấy điều gì?",
        answers: [
            "Doanh nghiệp đang thực hiện trách nhiệm xã hội một cách toàn diện.",
            "Doanh nghiệp đang giảm khả năng cạnh tranh.",
            "Doanh nghiệp chỉ chú trọng hình ảnh bên ngoài.",
            "Doanh nghiệp không đặt mục tiêu kinh doanh."
        ],
        correct: 0
    },
    {
        question: "Nội dung nào sau đây không thuộc trách nhiệm xã hội của doanh nghiệp?",
        answers: [
            "Đảm bảo hoạt động kinh doanh hiệu quả.",
            "Tuân thủ các quy định của pháp luật.",
            "Chủ động thực hiện các hoạt động có lợi cho cộng đồng.",
            "Tối đa hóa lợi nhuận bằng mọi cách bất kể hậu quả xã hội."
        ],
        correct: 3
    },
    {
        question: "Công ty A luôn chú trọng cải tiến công nghệ để tạo ra sản phẩm chất lượng, đồng thời đảm bảo việc làm ổn định và thu nhập phù hợp cho người lao động. Việc làm trên thể hiện doanh nghiệp đã thực hiện tốt trách nhiệm nào?",
        answers: [
            "Trách nhiệm pháp lí và nhân văn.",
            "Trách nhiệm kinh tế và đạo đức.",
            "Trách nhiệm chính trị và pháp lí.",
            "Trách nhiệm cạnh tranh và quảng bá."
        ],
        correct: 1
    },
    {
        question: "Hành động nào sau đây thể hiện doanh nghiệp thực hiện tốt trách nhiệm xã hội?",
        answers: [
            "Sử dụng nguyên liệu gây hại cho môi trường để giảm chi phí.",
            "Bảo đảm quyền lợi chính đáng của người lao động.",
            "Che giấu thông tin về sản phẩm.",
            "Trốn đóng bảo hiểm cho nhân viên."
        ],
        correct: 1
    },
    {
        question: "Công ty C áp dụng trí tuệ nhân tạo vào sản xuất giúp tăng năng suất. Một số lao động có nguy cơ mất việc nên công ty tổ chức đào tạo lại để họ chuyển sang vị trí mới. Việc làm này thể hiện:",
        answers: [
            "Doanh nghiệp từ bỏ mục tiêu lợi nhuận.",
            "Sự kết hợp giữa đổi mới kinh doanh và trách nhiệm với người lao động.",
            "Doanh nghiệp không biết sử dụng công nghệ.",
            "Doanh nghiệp vi phạm quyền tự do kinh doanh."
        ],
        correct: 1
    },
    {
        question: "Một công ty sản xuất thực phẩm phát hiện một lô hàng có nguy cơ không đảm bảo an toàn cho người tiêu dùng. Công ty quyết định thu hồi sản phẩm, công khai thông tin và chịu chi phí xử lí dù có thể ảnh hưởng đến lợi nhuận. Hành động này thể hiện:",
        answers: [
            "Doanh nghiệp ưu tiên bảo vệ hình ảnh thương hiệu nhằm duy trì khả năng cạnh tranh trên thị trường.",
            "Doanh nghiệp thực hiện trách nhiệm xã hội khi cân bằng giữa lợi ích kinh doanh, quyền lợi khách hàng và uy tín lâu dài.",
            "Doanh nghiệp thực hiện nghĩa vụ pháp lí vì mọi trường hợp sản phẩm lỗi đều bắt buộc phải thu hồi.",
            "Doanh nghiệp chấp nhận giảm lợi ích kinh tế trước mắt để thể hiện trách nhiệm đạo đức với xã hội."
        ],
        correct: 1
    },
    {
        question: "Doanh nghiệp tổ chức các hoạt động từ thiện, hỗ trợ người có hoàn cảnh khó khăn thể hiện trách nhiệm nào?",
        answers: [
            "Trách nhiệm nhân văn.",
            "Trách nhiệm kinh tế.",
            "Trách nhiệm pháp lí.",
            "Trách nhiệm sản xuất."
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

// Lấy các phần tử giao diện
const questionElement = document.getElementById("question");
const optionsContainer = document.querySelector(".options-container");
const nextButton = document.getElementById("next-btn");
const timeLeftElement = document.getElementById("time-left");
const timerContainer = document.querySelector(".timer-container");
const progressBar = document.getElementById("progress-bar"); // Phần tử thanh tiến trình

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    timerContainer.style.display = "inline-block";
    nextButton.innerHTML = "Câu tiếp theo";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();
    updateProgressBar(); // Cập nhật độ dài thanh tiến trình khi đổi câu hỏi
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn-option");
        optionsContainer.appendChild(button);
        
        if(index === currentQuestion.correct){
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    clearInterval(timer);
    nextButton.style.display = "none";
    while(optionsContainer.firstChild){
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Hàm cập nhật độ rộng phần trăm của thanh tiến trình
function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function startTimer() {
    timeLeft = 20;
    timeLeftElement.innerHTML = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerHTML = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

function selectAnswer(e){
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if(isCorrect){
        selectedBtn.style.backgroundColor = "#9aeabc";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "#ff9393";
    }
    
    endQuestionTurn();
}

function timeOut() {
    timeLeftElement.innerHTML = "Hết giờ!";
    endQuestionTurn();
}

function endQuestionTurn() {
    Array.from(optionsContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.style.backgroundColor = "#9aeabc";
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    timerContainer.style.display = "none";
    progressBar.style.width = "100%"; // Làm đầy thanh tiến trình khi hoàn thành
    questionElement.innerHTML = `Bạn đã hoàn thành bộ câu hỏi! <br><br>Số điểm của bạn là: <strong>${score}/${questions.length}</strong>`;
    nextButton.innerHTML = "Chơi lại từ đầu";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startGame();
    }
});

// Khởi chạy game
startGame();


