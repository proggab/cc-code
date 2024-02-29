let holidaysData;

function preload() {
    holidaysData = loadJSON('holidays.json', dataLoaded);
}

function dataLoaded(data) {
    holidaysData = data;
}

function setup() {
    createCanvas(1000, 600);
}

function draw() {
    background(255);

    textAlign(CENTER, CENTER);
    textSize(10);

    if (holidaysData) {
        let offsetX = 100;
        let offsetY = height - 100;

        // axis
        stroke(0);
        line(offsetX, offsetY, offsetX, 50); // Y axis
        line(offsetX, offsetY, width - 50, offsetY); // X axis

        // axis labels
        textAlign(CENTER);
        textSize(14);
        fill(0, 0, 0);
        text('Date', width / 2, height - 50);
        textAlign(CENTER, CENTER);
        text('Month', 30, 300);

        text("Holidays in Bosnia", width / 2, 10);

        // axis numbers
        for (let i = 1; i <= 12; i++) {
            let y = map(i, 1, 12, offsetY, 50);
            fill(255, 0, 0);
            text(monthName(i - 1), 70, y);
        }

        for (let i = 1; i <= 31; i++) {
            let x = map(i, 1, 31, offsetX, width - 50);
            fill(255, 0, 0);
            text(i, x, offsetY + 20);
        }

        // dates into data points and map to axis
        for (let i = 0; i < holidaysData.length; i++) {
            let dateParts = holidaysData[i].date.split('-');
            let month = parseInt(dateParts[1]);
            let day = parseInt(dateParts[2]);
            let x = map(day, 1, 31, offsetX, width - 50);
            let y = map(month, 1, 12, offsetY, 50);

            // draw point
            if (x >= offsetX && x <= width - 50 && y >= 50 && y <= offsetY) {
                noStroke();
                fill(255, 0, 0);
                ellipse(x, y, 8, 8);

                // mouse
                if (dist(mouseX, mouseY, x, y) < 8) {
                    textAlign(LEFT, CENTER);
                    textSize(12);
                    fill(0);
                    text(holidaysData[i].name, x + 10, y);
                    text(holidaysData[i].localName, x + 10, y + 15);

                    
                    
                }
            }
        }
    } else {
        text("error", width / 2, height / 2);
    }
}

function monthName(monthNumber) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[monthNumber];
}
