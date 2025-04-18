document.addEventListener('DOMContentLoaded', () => {
    const booths = document.querySelectorAll('.booth');
    const alertSound = new Audio('alert.mp3'); // Add your alert sound file

    booths.forEach((booth, index) => {
        const startButton = booth.querySelector('.start-button');
        const resetButton = booth.querySelector('.reset-button');
        const timerDisplay = booth.querySelector('.timer');
        const nameInput = booth.querySelector('.name-input');
        let timerInterval;
        let alertTriggered = false;

        startButton.addEventListener('click', () => {
            if (timerInterval) return; // Prevent multiple timers
            let timeRemaining = 3600; // 1 hour in seconds
            alertTriggered = false;
            timerDisplay.textContent = formatTime(timeRemaining);

            timerInterval = setInterval(() => {
                timeRemaining--;
                timerDisplay.textContent = formatTime(timeRemaining);

                if (timeRemaining === 600 && !alertTriggered) { // 10 minutes left
                    const guestName = nameInput.value + ' 고객님';
                    alertSound.play();
                    alert(`${guestName}\n${index + 1}번 부스 10분 남았습니다!`);
                    alertSound.pause();
                    alertSound.currentTime = 0;
                    alertTriggered = true;
                }

                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    const guestName = nameInput.value + ' 고객님';
                    alertSound.play();
                    alert(`${guestName}\n${index + 1}번 부스 이용 시간이 종료되었습니다. 퇴장 부탁드립니다.`);
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }
            }, 1000);
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.textContent = '1:00:00';
            nameInput.value = '';
        });
    });

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}); 