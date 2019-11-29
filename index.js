const express = require("express");
const fileUpload = require("express-fileupload");
const puppeteer = require("puppeteer");

const serverPort = process.env["SERVER_PORT"] || 3000;
const puppeteerOptions = {
    args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
    ],
};

(async () => {
    const browser = await puppeteer.launch(puppeteerOptions);
    const app = express();

    app.use(fileUpload());

    app.post("/convert", async function (req, res, next) {
        try {
            if (!req.files) {
                res.status(400);
                next();

                return;
            }

            const htmlContent = req.files.html.data.toString();
            const page = await browser.newPage();

            await page.setContent(htmlContent);
            await page.emulateMedia("screen");

            const pdfBuffer = await page.pdf();

            res.status(201).type("application/pdf").send(pdfBuffer);

            next();

            await page.close();
        } catch (error) {
            // handle errors
        }
    });

    app.listen(serverPort, () => {
        console.log(`html2pdf server is listening on port ${serverPort}`);
    });
})();
