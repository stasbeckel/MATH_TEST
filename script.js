document.addEventListener('DOMContentLoaded', () => {
	const questionContainer = document.getElementById('question-container');
	const questionElement = document.getElementById('question');
	const optionsElement = document.getElementById('options');
	const nextButton = document.getElementById('next-button');
	const scoreElement = document.getElementById('score');

	let currentQuestionIndex = 0;
	let score = 0;

	const questions = [
			{
					question: "(u+v)'",
					options: ["u' + v'", "u' - v'", "u'v + uv'", "\\frac{u'v - uv'}{v^2}"],
					correctAnswer: "u' + v'"
			},
			{
					question: "(u-v)'",
					options: ["u' + v'", "u' - v'", "u'v + uv'", "\\frac{u'v - uv'}{v^2}"],
					correctAnswer: "u' - v'"
			},
			{
					question: "(uv)'",
					options: ["u' + v'", "u' - v'", "u'v + uv'", "\\frac{u'v - uv'}{v^2}"],
					correctAnswer: "u'v + uv'"
			},
			{
					question: "\\left(\\frac{u}{v}\\right)'",
					options: ["u' + v'", "u' - v'", "u'v + uv'", "\\frac{u'v - uv'}{v^2}"],
					correctAnswer: "\\frac{u'v - uv'}{v^2}"
			},
			{
					question: "C'",
					options: ["0", "1", "x", "\\ln x"],
					correctAnswer: "0"
			},
			{
					question: "(x^n)'",
					options: ["n \\cdot x^{n-1}", "x^n", "n \\cdot x", "\\ln x"],
					correctAnswer: "n \\cdot x^{n-1}"
			},
			{
					question: "\\sqrt{x}'",
					options: ["\\frac{1}{2\\sqrt{x}}", "\\sqrt{x}", "x", "\\ln x"],
					correctAnswer: "\\frac{1}{2\\sqrt{x}}"
			},
			{
					question: "(a^x)'",
					options: ["a^x \\cdot \\ln a", "a^x", "\\ln a", "x"],
					correctAnswer: "a^x \\cdot \\ln a"
			},
			{
					question: "(e^x)'",
					options: ["e^x", "\\ln x", "x", "\\frac{1}{x}"],
					correctAnswer: "e^x"
			},
			{
					question: "(\\ln x)'",
					options: ["\\frac{1}{x}", "\\ln x", "x", "e^x"],
					correctAnswer: "\\frac{1}{x}"
			},
			{
					question: "(\\cos x)'",
					options: ["-\\sin x", "\\cos x", "\\sin x", "\\tan x"],
					correctAnswer: "-\\sin x"
			},
			{
					question: "(\\sin x)'",
					options: ["\\cos x", "\\sin x", "-\\sin x", "\\tan x"],
					correctAnswer: "\\cos x"
			},
			{
					question: "(\\tan x)'",
					options: ["\\frac{1}{\\cos^2 x}", "\\tan x", "\\sin x", "\\cos x"],
					correctAnswer: "\\frac{1}{\\cos^2 x}"
			},
			{
					question: "(\\cot x)'",
					options: ["-\\frac{1}{\\sin^2 x}", "\\cot x", "\\sin x", "\\cos x"],
					correctAnswer: "-\\frac{1}{\\sin^2 x}"
			},
			{
					question: "(f(g(x)))'",
					options: ["f'(g(x)) \\cdot g'(x)", "f(g(x))", "g'(x)", "f'(x)"],
					correctAnswer: "f'(g(x)) \\cdot g'(x)"
			},
			{
					question: "(u^n)'",
					options: ["n \\cdot u^{n-1} \\cdot u'", "u^n", "n \\cdot u", "\\ln u"],
					correctAnswer: "n \\cdot u^{n-1} \\cdot u'"
			},
			{
					question: "(\\sqrt{u})'",
					options: ["\\frac{1}{2\\sqrt{u}} \\cdot u'", "\\sqrt{u}", "u", "\\ln u"],
					correctAnswer: "\\frac{1}{2\\sqrt{u}} \\cdot u'"
			},
			{
					question: "(a^u)'",
					options: ["a^u \\cdot \\ln a \\cdot u'", "a^u", "\\ln a", "u"],
					correctAnswer: "a^u \\cdot \\ln a \\cdot u'"
			},
			{
					question: "(e^u)'",
					options: ["e^u \\cdot u'", "e^u", "u", "\\ln u"],
					correctAnswer: "e^u \\cdot u'"
			},
			{
					question: "(\\log_a u)'",
					options: ["\\frac{1}{u \\ln a} \\cdot u'", "\\log_a u", "u", "\\ln a"],
					correctAnswer: "\\frac{1}{u \\ln a} \\cdot u'"
			},
			{
					question: "(\\ln u)'",
					options: ["\\frac{u'}{u}", "\\ln u", "u", "e^u"],
					correctAnswer: "\\frac{u'}{u}"
			},
			{
					question: "(\\arccos x)'",
					options: ["-\\frac{1}{\\sqrt{1-x^2}}", "\\arccos x", "x", "\\sqrt{1-x^2}"],
					correctAnswer: "-\\frac{1}{\\sqrt{1-x^2}}"
			},
			{
					question: "(\\arcsin x)'",
					options: ["\\frac{1}{\\sqrt{1-x^2}}", "\\arcsin x", "x", "\\sqrt{1-x^2}"],
					correctAnswer: "\\frac{1}{\\sqrt{1-x^2}}"
			},
			{
					question: "(\\arctan x)'",
					options: ["\\frac{1}{1+x^2}", "\\arctan x", "x", "1+x^2"],
					correctAnswer: "\\frac{1}{1+x^2}"
			},
			{
					question: "(\\operatorname{arcctg} x)'",
					options: ["-\\frac{1}{1+x^2}", "\\operatorname{arcctg} x", "x", "1+x^2"],
					correctAnswer: "-\\frac{1}{1+x^2}"
			},
			{
					question: "(\\cos x)'",
					options: ["\\sin x", "\\cos x", "x", "e^x"],
					correctAnswer: "\\sin x"
			},
			{
					question: "(\\sin x)'",
					options: ["\\cos x", "\\sin x", "x", "e^x"],
					correctAnswer: "\\cos x"
			},
			{
					question: "\\cos x",
					options: ["\\frac{e^x + e^{-x}}{2}", "\\cos x", "x", "e^x"],
					correctAnswer: "\\frac{e^x + e^{-x}}{2}"
			}
	];

	function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
			}
	}

	function showQuestion() {
			const currentQuestion = questions[currentQuestionIndex];
			questionElement.innerHTML = `\\(${currentQuestion.question}\\)`;
			optionsElement.innerHTML = '';

			const shuffledOptions = [...currentQuestion.options];
			shuffleArray(shuffledOptions);

			shuffledOptions.forEach((option, index) => {
					const button = document.createElement('button');
					button.innerHTML = `\\(${option}\\)`;
					button.classList.add('option');
					button.addEventListener('click', () => selectAnswer(button, option));
					optionsElement.appendChild(button);
			});

			nextButton.disabled = true;
			MathJax.typesetPromise([questionElement, optionsElement]).then(() => {});
	}

	function selectAnswer(button, selectedOption) {
			const currentQuestion = questions[currentQuestionIndex];
			if (selectedOption === currentQuestion.correctAnswer) {
					score++;
					button.classList.add('correct');
			} else {
					button.classList.add('incorrect');
			}
			nextButton.disabled = false;
	}

	function nextQuestion() {
			currentQuestionIndex++;
			if (currentQuestionIndex < questions.length) {
					showQuestion();
			} else {
					showScore();
			}
	}

	function showScore() {
			questionContainer.style.display = 'none';
			nextButton.style.display = 'none';
			scoreElement.textContent = `Ваш счет: ${score} из ${questions.length}`;
	}

	nextButton.addEventListener('click', nextQuestion);

	showQuestion();
});
