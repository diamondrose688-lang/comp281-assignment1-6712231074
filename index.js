import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "A01 - App Graphics 2D";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "skyblue",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);


		//วาดภูเขาปิ้วว
		//รูปภูเขาเเรกกกกกก

		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.moveTo(0,180);
		ctx.quadraticCurveTo(150,-100,300,200);
		ctx.lineTo(0,200);
		ctx.closePath();
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.stroke();

		//รูปภูเขาที่่สองง
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.bezierCurveTo(600, -150, 500, 300, 800, 80);
		ctx.lineTo(800, 200);
		ctx.lineTo(300, 200);
		ctx.closePath();
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();

   //วาดพระอาทิตย์กับเติมฟิลสนามหญ้าข้างล่าล่าง
		ctx.beginPath();
		ctx.arc(301, 50, 30, 0, Math.PI * 2);
		ctx.fillStyle = "orange";
		ctx.fill();	
		ctx.fillStyle = "rgba(78, 163, 97, 1)";
		ctx.fillRect(0, 200, 800, 600);

		//วาดแม่น้ำคงคา555555555
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.bezierCurveTo(100, 500, 600, 500, 280, 600);
		ctx.lineTo(560, 600); 
		ctx.bezierCurveTo(600, 500, 200, 400, 500, 200); 
		ctx.fillStyle = "rgba(124, 223, 218, 1)"; 
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.stroke();


		//ส่วนของการวาดบ้านน

		//ชิ้นส่วนตัวบ้าน 1
		ctx.beginPath();
		ctx.moveTo(480,300);
		ctx.lineTo(480,370);
		ctx.lineTo(580,370);
		ctx.lineTo(580,300);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.fillStyle = "rgba(102, 88, 74, 1)";
		ctx.fill();

		//ชิ้นส่วนหลังคาบ้าน 1
		ctx.beginPath();
		ctx.moveTo(480,300);
		ctx.lineTo(530,250);
		ctx.lineTo(580,300);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.fillStyle = "rgba(221, 109, 94, 1)";
		ctx.fill();

		//ชิ้นส่วนตัวบ้าน 2
		ctx.beginPath();
		ctx.moveTo(650,300);
		ctx.lineTo(650,370);
		ctx.lineTo(580,370);
		ctx.lineTo(580,300);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "rgba(102, 88, 74, 1)";
		ctx.fill();

		//ชิ้นส่วนหลังคาบ้าน 2
		ctx.beginPath();
		ctx.moveTo(530,250);
		ctx.lineTo(650,250);
		ctx.lineTo(650,300);
		ctx.lineTo(580,300);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "rgba(221, 109, 94, 1)";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;

		//ส่วนประตูบ้าน
		ctx.beginPath();
		ctx.moveTo(520,370);
		ctx.lineTo(520,340);
		ctx.lineTo(540,340);
		ctx.lineTo(540,370); 
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.fill();

		//วาดหน้าต่่างบ้าน
		ctx.beginPath();
		ctx.moveTo(630,350);
		ctx.lineTo(610,350);
		ctx.lineTo(610,330);
		ctx.lineTo(630,330);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.fill();
		
		
		
		
		
		
		
		
		
		
	

		// เขตสิ้นสุดของการวาดรูป


		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	// เริ่มต้นการวาดภาพบน canvas
	draw();
}