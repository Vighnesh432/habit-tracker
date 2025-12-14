const express = require("express");
const router = express.Router();
const db = require("../db/database");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const DEFAULT_HABITS = [
  "Exercise",
  "Read 30 minutes",
  "Drink 2L Water",
];

const chartCanvas = new ChartJSNodeCanvas({
  width: 500,
  height: 300,
});

/* =========================
   📊 ANALYTICS SUMMARY
========================= */
router.get("/analytics/summary", (req, res) => {
  const days = db.prepare("SELECT date FROM daily_logs ORDER BY date").all();

  const dailyProgress = days.map(d => {
    const habits = db
      .prepare("SELECT completed FROM habits WHERE date = ?")
      .all(d.date);
    const done = habits.filter(h => h.completed).length;
    return {
      date: d.date,
      percent: habits.length
        ? Math.round((done / habits.length) * 100)
        : 0,
    };
  });

  const habitStats = db.prepare(`
    SELECT name,
           SUM(completed) as done,
           COUNT(*) as total
    FROM habits
    GROUP BY name
  `).all();

  const completed = habitStats.reduce((a, h) => a + h.done, 0);
  const total = habitStats.reduce((a, h) => a + h.total, 0);

  res.json({
    dailyProgress,
    habitStats,
    overall: {
      completed,
      missed: total - completed,
    },
  });
});

/* =========================
   🤖 AI FEEDBACK
========================= */
router.get("/ai/feedback", (req, res) => {
  const days = db
    .prepare("SELECT date FROM daily_logs ORDER BY date DESC LIMIT 2")
    .all();

  if (days.length < 2) {
    return res.json({
      message: "Not enough data yet. Keep tracking your habits!",
    });
  }

  const score = date =>
    db.prepare(
      "SELECT COUNT(*) as c FROM habits WHERE date=? AND completed=1"
    ).get(date).c;

  const today = score(days[0].date);
  const yesterday = score(days[1].date);

  const comparison =
    today > yesterday ? "better" : today < yesterday ? "worse" : "same";

  res.json({
    todayScore: today,
    yesterdayScore: yesterday,
    comparison,
    suggestion:
      comparison === "better"
        ? "Great improvement! Keep the momentum."
        : comparison === "worse"
        ? "Try focusing on one key habit tomorrow."
        : "Consistency is good. Try pushing one habit further.",
  });
});

/* =========================
   📤 EXPORT PDF (WITH CHARTS)
========================= */
router.get("/export/pdf/:date", async (req, res) => {
  const { date } = req.params;

  const habits = db
    .prepare("SELECT name, completed FROM habits WHERE date = ?")
    .all(date);

  const analytics = await new Promise(resolve => {
    const days = db.prepare("SELECT date FROM daily_logs ORDER BY date").all();
    const dailyProgress = days.map(d => {
      const h = db
        .prepare("SELECT completed FROM habits WHERE date=?")
        .all(d.date);
      const done = h.filter(x => x.completed).length;
      return {
        date: d.date,
        percent: h.length ? Math.round((done / h.length) * 100) : 0,
      };
    });
    resolve(dailyProgress);
  });

  const lineChart = await chartCanvas.renderToBuffer({
    type: "line",
    data: {
      labels: analytics.map(d => d.date),
      datasets: [
        {
          label: "Daily Completion %",
          data: analytics.map(d => d.percent),
        },
      ],
    },
  });

  const doc = new PDFDocument({ margin: 40 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=habit-report-${date}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("Habit Tracker Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${date}`, { align: "center" });
  doc.moveDown();

  doc.fontSize(16).text("Habits");
  habits.forEach(h =>
    doc.text(`${h.completed ? "✔" : "✘"} ${h.name}`)
  );

  doc.addPage();
  doc.fontSize(16).text("Analytics");
  doc.image(lineChart, { width: 400 });

  doc.end();
});

/* =========================
   📤 EXPORT EXCEL
========================= */
router.get("/export/excel/:date", async (req, res) => {
  const { date } = req.params;

  const habits = db
    .prepare("SELECT name, completed FROM habits WHERE date = ?")
    .all(date);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Habits");

  sheet.columns = [
    { header: "Habit", key: "name", width: 30 },
    { header: "Completed", key: "completed", width: 15 },
  ];

  habits.forEach(h =>
    sheet.addRow({
      name: h.name,
      completed: h.completed ? "Yes" : "No",
    })
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=habits-${date}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
});

/* =========================
   📅 ALL DAYS
========================= */
router.get("/", (req, res) => {
  const days = db
    .prepare("SELECT date FROM daily_logs ORDER BY date")
    .all();
  res.json(days.map(d => d.date));
});

/* =========================
   📅 GET HABITS BY DATE (KEEP LAST)
========================= */
router.get("/:date", (req, res) => {
  const { date } = req.params;

  let habits = db
    .prepare("SELECT name, completed FROM habits WHERE date = ?")
    .all(date);

  if (habits.length === 0) {
    db.prepare(
      "INSERT OR IGNORE INTO daily_logs (date) VALUES (?)"
    ).run(date);

    const stmt = db.prepare(
      "INSERT INTO habits (date, name, completed) VALUES (?, ?, ?)"
    );

    DEFAULT_HABITS.forEach(h => stmt.run(date, h, 0));

    habits = db
      .prepare("SELECT name, completed FROM habits WHERE date = ?")
      .all(date);
  }

  res.json(habits);
});

/* =========================
   ✅ TOGGLE
========================= */
router.post("/toggle", (req, res) => {
  const { date, name, completed } = req.body;

  db.prepare(
    "UPDATE habits SET completed = ? WHERE date = ? AND name = ?"
  ).run(completed ? 1 : 0, date, name);

  res.json({ success: true });
});

module.exports = router;
