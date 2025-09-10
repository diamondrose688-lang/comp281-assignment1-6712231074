import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "A01 - App Graphics 2D";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");
    
	//ทำเมาส์ไว้หาพิกัด
	let mousePos = {x:0,y:0};
	// อัปเดตตำแหน่งเมาส์เมื่อมีการเคลื่อนที่
	document.addEventListener("mousemove", function(evt){
		mousePos.x = evt.offsetX;
		mousePos.y = evt.offsetY;
	});

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "rgba(30, 157, 207, 0.7)",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;


    // สร้าง Cloud
            class Cloud {
            constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
        }
            render(ctx) {
			//  Cloud
			ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
            ctx.arc(this.x + 40, this.y + 10, 30, 0, Math.PI * 2);
            ctx.arc(this.x - 30, this.y + 10, 25, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
            update() {
            this.x -= this.speed;
            if (this.x < -200) {
                this.x = 800;
                this.y = Math.random() * 150;
            }
        }
    }
    // สร้าง Bird
        class Bird {
        constructor(x, y, speed, direction = 'left') {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction; // 'left' หรือ 'right'
        this.wingAngle = 0;
        this.wingSpeed = 0.1;
    }
        render(ctx) {
       
    // การขยับของปีก
        this.wingAngle += this.wingSpeed;
        const wingOffset = Math.sin(this.wingAngle) * 5;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.lineWidth = 2;
    // กำหนดการสะท้อนภาพ (flip) ตามทิศทางบิน
        const flip = (this.direction === 'right') ? -1 : 1;
        ctx.save();
        ctx.scale(flip, 1);
    // ปีกซ้าย 
        ctx.beginPath();
        ctx.moveTo(this.x * flip, this.y);
        ctx.quadraticCurveTo((this.x - 10) * flip, this.y - 10 + wingOffset, (this.x - 20) * flip, this.y);
        ctx.stroke();
        ctx.closePath();
    // ปีกขวา 
        ctx.beginPath();
        ctx.moveTo(this.x * flip, this.y);
        ctx.quadraticCurveTo((this.x + 10) * flip, this.y - 10 + wingOffset, (this.x + 20) * flip, this.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
        update() { //เคลื่อนที่วัตถุ: ในแต่ละเฟรม
        if (this.direction === 'left') {
            this.x -= this.speed;
            if (this.x < -20) {
                this.x = 820;
                this.y = Math.random() * 150;
            }
        } else { // direction === 'right'
            this.x += this.speed;
            if (this.x > 820) {
                this.x = -20;
                this.y = Math.random() * 150;
            }
        }
    }
}
    // สร้างอ็อบเจกต์ที่ต้องการ
            const myCloud = new Cloud(700, 50, 0.75); //ลอยไปซ้าย
            const myBird = new Bird(500, 50, 0.5);//บินไปขวา
            const myBird2 = new Bird(200, 80, 0.5,"Left");//บินไปซ้าย
            let sunAngle = 0;
            const sunRadius = 20;
            const centerX = 580;
            const centerY = 60;
	    function draw() {
	// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();
    // กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);
    // อัปเดตและวาดพระอาทิตย์
        sunAngle += 0.005;
        const sunX = centerX + Math.cos(sunAngle) * sunRadius;
        const sunY = centerY + Math.sin(sunAngle) * sunRadius;
    //ทำตัวเเสดงพิกัดบนจอ
		ctx.font = "15px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(`Mouse: ${mousePos.x},${mousePos.y}`, 680, 20);
	
    
    
    //น้องภูเขา
		ctx.beginPath();
		ctx.moveTo(0,200);
		ctx.quadraticCurveTo(200, -50, 300, 200);
		ctx.quadraticCurveTo(400, -50, 600, 200);
		ctx.quadraticCurveTo(700., -80, 850, 200);
	    ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "green";
        ctx.fill();

	//พื้นหญ้า
        ctx.fillStyle = "rgba(179, 123, 20, 0.71)";
		ctx.fillRect(0, 200, 800, 400);

	// ใบไม้
	    ctx.beginPath();
		ctx.arc(120, 300, 50, 0, Math.PI * 2); // ใบไม้
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
		ctx.fill();
		ctx.strokeStyle = "rgba(0, 255, 0, 1)";
		ctx.lineWidth = 2;
		ctx.closePath();
		ctx.stroke();

    // ลำต้น
	    ctx.beginPath();
		ctx.fillStyle = "brown";
		ctx.fillRect(110, 300, 20, 100);
		ctx.fillRect(120, 310, 40, 15);
		ctx.closePath();
		ctx.stroke();

	// วาดบ้าน 2 ชั้น พร้อมเส้นขอบทุกส่วน
        ctx.beginPath();
    // บ้าน 2 ชั้น
        ctx.fillStyle = "brown"; // กำหนดสีตัวบ้านเป็นสีน้ำตาล
        ctx.rect(400, 200, 150, 200); // วาดสี่เหลี่ยมสำหรับตัวบ้าน (x, y, width, height)
        ctx.fill(); // เติมสีตัวบ้าน
        ctx.strokeStyle = "black"; // กำหนดสีเส้นขอบเป็นสีดำ
        ctx.lineWidth = 2; // กำหนดความหนาของเส้นขอบ
        ctx.stroke(); // วาดเส้นขอบตัวบ้าน
        ctx.closePath(); // ปิด path สำหรับตัวบ้าน

    // หลังคา
        ctx.beginPath(); // เริ่ม path ใหม่สำหรับหลังคา
        ctx.moveTo(380, 200); // เริ่มวาดจากมุมซ้ายของหลังคา
        ctx.lineTo(570, 200); // วาดเส้นตรงไปยังมุมขวา
        ctx.lineTo(475, 120); // วาดเส้นไปยังจุดยอดของหลังคา
        ctx.closePath(); // ปิดเส้นทางเพื่อสร้างรูปสามเหลี่ยม
        ctx.fillStyle = "darkred"; // กำหนดสีหลังคาเป็นสีแดงเข้ม
        ctx.fill(); // เติมสีหลังคา
        ctx.strokeStyle = "black"; // กำหนดสีเส้นขอบเป็นสีดำ
        ctx.lineWidth = 2; // กำหนดความหนาของเส้นขอบ
        ctx.stroke(); // วาดเส้นขอบหลังคา

    // ประตู
        ctx.beginPath(); // เริ่ม path ใหม่สำหรับประตู
        ctx.fillStyle = "black"; // กำหนดสีประตูเป็นสีดำ
        ctx.rect(460, 350, 30, 50); // วาดสี่เหลี่ยมสำหรับประตู
        ctx.fill(); // เติมสีประตู
        ctx.strokeStyle = "rgba(122, 84, 57, 1)"; // กำหนดสีเส้นขอบเป็นสีน้ำตาล
        ctx.lineWidth = 2; // กำหนดความหนาของเส้นขอบ
        ctx.stroke(); // วาดเส้นขอบประตู
        ctx.closePath(); // ปิด path สำหรับประตู

    // หน้าต่างชั้นล่าง (บานซ้าย)
        ctx.beginPath();
        ctx.fillStyle = "lightblue"; // กำหนดสีหน้าต่างเป็นสีฟ้าอ่อน
        ctx.rect(420, 320, 25, 25);
        ctx.fill();
        ctx.strokeStyle = "rgba(122, 84, 57, 1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    // หน้าต่างชั้นล่าง (บานขวา)
        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.rect(510, 320, 25, 25);
        ctx.fill();
        ctx.strokeStyle = "rgba(122, 84, 57, 1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    // หน้าต่างชั้นบน (บานซ้าย)
        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.rect(420, 220, 25, 25);
        ctx.fill();
        ctx.strokeStyle = "rgba(122, 84, 57, 1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    // หน้าต่างชั้นบน (บานขวา)
        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.rect(510, 220, 25, 25);
        ctx.fill();
        ctx.strokeStyle = "rgba(122, 84, 57, 1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

    // พระอาทิตย์
        ctx.beginPath();
        ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
        ctx.shadowColor = "rgba(255, 255, 0, 0.8)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
        ctx.shadowColor = "rgba(0, 0, 0, 0)";
        ctx.shadowBlur = 0;

    // ก้อนเมฆ
        myCloud.update();
        myCloud.render(ctx);

    // อัปเดตและวาดนก
        myBird.update();
        myBird.render(ctx);

    // อัปเดตและวาดนกตัวที่สอง
        myBird2.update();
        myBird2.render(ctx);

     // ลำธาร
        ctx.beginPath();
        ctx.moveTo(600, 200);
        ctx.quadraticCurveTo(560, 250, 600, 400); 
        ctx.lineTo(500, 600);
        ctx.quadraticCurveTo(900, 800, 700, 200); 
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.strokeStyle = "rgba(173, 125, 20, 0.9)";
        ctx.lineWidth = 2;
        ctx.stroke();

    // เส้นน้ำไหล
        const time = Date.now() / 100; // ความเร็วในการไหล
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2;

    // Loop เพื่อวาดเส้นน้ำ 3 เส้น
        for (let i = 0; i < 3; i++) {
    
	
	    ctx.beginPath();
	    const startYOffset = (time % 230) - (i * 120);
    // ส่วนโค้งเส้นน้ำ1
        const startX = 650;
        const startY = 445+ startYOffset;
    // ส่วนโค้งเส้นน้ำ2
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
        startX + 20, startY + 30,
        startX, startY + 40
    );

    // ส่วนโค้งเส้นน้ำ3
        ctx.quadraticCurveTo(
        startX - 50, startY + 50,
        startX, startY + 100
    );
        ctx.stroke();
        ctx.closePath();
}

    // นา
        ctx.beginPath();
        ctx.fillStyle = "rgba(100, 149, 237, 0.8)"; // สีน้ำเงินอ่อนสำหรับน้ำในนา
        ctx.rect(50, 400, 200, 150); // วาดสี่เหลี่ยมผืนผ้าสำหรับนา
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"; // เส้นขอบสีดำจางๆ
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();

    // ต้นข้าว (ตำแหน่งที่ถูกต้อง)
    // ใช้ลูปซ้อนกัน 2 ชั้นเพื่อวาดต้นข้าวเป็นตาราง
        for (let i = 0; i < 7; i++) { //วนข้าวเเนวนอน
        for (let j = 0; j < 5; j++) {  //วนข้าวเเนวตั้ง
    // คำนวณตำแหน่ง x และ y สำหรับกอข้าวแต่ละกอ
        const groupX = 65 + (i * 28);
        const groupY = 430 + (j * 28);

    // ต้นข้าว
        ctx.strokeStyle = "rgba(248, 252, 3, 1)"; // สีก้านข้าว
        ctx.lineWidth = 1; // ความหนาของเส้นก้านข้าว
        for (let k = 0; k < 3; k++) { // วาด 3-5 เส้นต่อ 1 กอ
            ctx.beginPath();
            
	// เส้นก้านข้าว
            const startX = groupX + (k * 2) - 2;
            const startY = groupY;
            const controlX = startX + (k % 2 === 0 ? 5 : -5); // ทำให้โค้งสลับข้าง
            const controlY = groupY - 35 - (k * 2); // จุดควบคุมที่สูงขึ้น
            const endX = startX + (k % 2 === 0 ? 3 : -3);
            const endY = groupY - 15 - (k * 3); // ปลายก้านข้าว
			ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(controlX, controlY, endX, endY);
            ctx.stroke();

        
        }
    }
}

    

		
		


		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	// เริ่มต้นการวาดภาพบน canvas
	draw();
}