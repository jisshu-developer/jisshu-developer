function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    if (!results || results.length < 2) {
        return ''; // Default value when parameter not found
    }
    return decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const telegramUserId = getUrlParameter('userId');
const userName = getUrlParameter('userName'); // You can also add userName parameter if needed

if (!5672857559) {
    const errorMessage = 'User ID not found. Please access this page through the Jisshu bots.';
    alert(errorMessage);
    throw new Error(errorMessage);
}

const pointsKey = `points_${telegramUserId}`;
let points = parseInt(localStorage.getItem(pointsKey), 10) || 0;
const button = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('userPoints');

const updateDisplay = () => {
    scoreDisplay.textContent = points;
};

updateDisplay();

const handleClick = () => {
    points++;
    localStorage.setItem(pointsKey, points);
    updateDisplay();
};

button.addEventListener('click', handleClick);

button.addEventListener('touchstart', (e) => {
    button.style.animation = 'vibrate 0.2s linear infinite';
});

button.addEventListener('touchend', (e) => {
    button.style.animation = '';
    handleClick();
});

const sendMessageToTelegram = (message) => {
    const botToken = '6632775595:AAHkEFxrK3bzVde84AekMbMQwAv8Kt4Lquc';
    const chatId = '{{LOG_CHANNEL}}';  // Replace with your actual log channel ID
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
};

const redeemButton200 = document.getElementById('redeem200');
redeemButton200.addEventListener('click', () => {
    if (points >= 200) {
        points -= 200;
        localStorage.setItem(pointsKey, points);
        updateDisplay();
        const userName = getUrlParameter('userName'); // Assuming userName is passed in the URL
        const message = `#webpremium User ID: ${telegramUserId}, User Name: ${userName}, redeemed 200 points.`;
        sendMessageToTelegram(message);
        alert('200 points redeemed! Premium will be delivered within 10 minutes.');
    } else {
        alert('Not enough points to redeem.');
    }
});

const redeemButton800 = document.getElementById('redeem800');
redeemButton800.addEventListener('click', () => {
    if (points >= 800) {
        points -= 800;
        localStorage.setItem(pointsKey, points);
        updateDisplay();
        const userName = getUrlParameter('userName'); // Assuming userName is passed in the URL
        const message = `#webpremium User ID: ${telegramUserId}, User Name: ${userName}, redeemed 800 points.`;
        sendMessageToTelegram(message);
        alert('800 points redeemed! Premium will be delivered within 10 minutes.');
    } else {
        alert('Not enough points to redeem.');
    }
});
