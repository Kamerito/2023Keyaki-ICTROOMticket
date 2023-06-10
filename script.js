document.getElementById('ticketForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById('name').value;
    var quantity = document.getElementById('quantity').value;

    if (name && quantity) {
        var ticketNumber = getTicketNumber();
        var currentDate = getCurrentDate();

        var ticketContent = '<h2>2023けやき祭ICTROOMレーザー実演引換券</h2>' +
            '<img src="logo.png" alt="ロゴ" width="100px" height="100px" class="small-logo">' +
            '<p>整理券番号: ' + ticketNumber + '</p>' +
            '<p>お名前: ' + name + '</p>' +
            '<p>個数: ' + quantity + '</p>' +
            '<p>発行日時: ' + currentDate + '</p>';

        document.getElementById('ticket').innerHTML = ticketContent;
        document.getElementById('receiveButton').disabled = false;

        // Save ticket data to local storage
        var ticketData = {
            ticketNumber: ticketNumber,
            name: name,
            quantity: quantity,
            issuedDate: currentDate
        };
        localStorage.setItem('ticketData', JSON.stringify(ticketData));

    }



});

// Check if ticket data exists in local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    var ticketData = localStorage.getItem('ticketData');

    if (ticketData) {
        var parsedTicketData = JSON.parse(ticketData);
        var ticketNumber = parsedTicketData.ticketNumber;
        var name = parsedTicketData.name;
        var quantity = parsedTicketData.quantity;
        var issuedDate = parsedTicketData.issuedDate;

        var ticketContent = '<h2>2023けやき祭ICTROOMレーザー実演引換券</h2>' +
            '<img src="logo.png" alt="ロゴ" width="100px" height="100px" class="small-logo">' +
            '<p>整理券番号: ' + ticketNumber + '</p>' +
            '<p>お名前: ' + name + '</p>' +
            '<p>個数: ' + quantity + '</p>' +
            '<p>発行日時: ' + issuedDate + '</p>';

        document.getElementById('ticket').innerHTML = ticketContent;
        document.getElementById('receiveButton').disabled = false;
    }
});

document.getElementById('receiveButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent button click

    var passcode = prompt('受け取りのための暗証番号を入力してください：');

    if (passcode === '0627') {
        localStorage.removeItem('ticketData');
        document.getElementById('ticket').innerHTML = '';
        document.getElementById('receiveButton').disabled = true;
        alert('チケットのデータが削除されました。再発行が可能です。');
    } else {
        alert('暗証番号が正しくありません。ICTROOMの展示担当生徒までお問い合わせください！');
    }
});

// Function to generate the ticket number based on the current date
function getTicketNumber() {
    var currentDate = getCurrentDate();
    var ticketNumber = localStorage.getItem(currentDate);

    if (!ticketNumber) {
        ticketNumber = 1;
    } else {
        ticketNumber = parseInt(ticketNumber) + 1;
    }

    localStorage.setItem(currentDate, ticketNumber);
    return ticketNumber;
}

// Function to get the current date (YYYY-MM-DD format)
function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');
    var currentDate = year + '-' + month + '-' + day;
    return currentDate;
}

