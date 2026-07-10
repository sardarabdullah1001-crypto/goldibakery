import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "https://tshhpxomrndmznhjqkea.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_Y1Wi2IqU-ORJZ_ngaGFF3Q_khl8KG39";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for order confirmation & hidden backend email notification
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = req.body;
      const {
        id,
        customerName,
        customerPhone,
        customerEmail,
        deliveryMethod,
        deliveryAddress,
        deliveryCity,
        deliveryZip,
        selectedDate,
        notes,
        items,
        total,
      } = orderData;

      console.log(`[Backend] Received Order #${id} for ${customerName}`);

      // 1. Insert order into Supabase Database
      try {
        console.log(`[Backend] Attempting to save order #${id} to Supabase...`);
        const { error } = await supabase
          .from("orders")
          .insert([
            {
              id: id,
              customer_name: customerName,
              customer_phone: customerPhone,
              customer_email: customerEmail,
              delivery_method: deliveryMethod,
              delivery_address: deliveryAddress ? `${deliveryAddress}${deliveryCity ? `, ${deliveryCity}` : ""}${deliveryZip ? ` ${deliveryZip}` : ""}` : "",
              selected_date: selectedDate,
              notes: notes || "",
              items: items, // Supabase handles raw JSON/array objects automatically for jsonb columns
              total: total,
            }
          ]);

        if (error) {
          console.warn("[Backend Warning] Supabase insertion failed.");
          console.warn("Error message:", error.message);
          
          if (error.message.includes("row-level security") || error.message.includes("RLS")) {
            console.log(`
========================================================================
💡 ROW-LEVEL SECURITY (RLS) ISSUE DETECTED!
------------------------------------------------------------------------
Your 'orders' table is protected by RLS, which blocks anonymous inserts.
To resolve this error, please run ONE of the following SQL statements
in your Supabase SQL Editor:

-- OPTION A: Disable RLS completely for the orders table (Recommended)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- OPTION B: Keep RLS enabled but allow public inserts
CREATE POLICY "Allow public insert" ON orders FOR INSERT WITH CHECK (true);
========================================================================
            `);
          } else {
            console.log(`
========================================================================
💡 TO CREATE THE REQUIRED TABLE, RUN THE FOLLOWING SQL IN YOUR SUPABASE SQL EDITOR:
------------------------------------------------------------------------
create table orders (
  id text primary key,
  customer_name text,
  customer_phone text,
  customer_email text,
  delivery_method text,
  delivery_address text,
  selected_date text,
  notes text,
  items jsonb,
  total integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Note: Remember to disable RLS or add a policy to allow public inserts!
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
========================================================================
            `);
          }
        } else {
          console.log(`[Backend] Order #${id} successfully stored in Supabase!`);
        }
      } catch (dbErr: any) {
        console.error("[Backend Error] Failed database write during Supabase integration:", dbErr);
      }

      // Construct a beautiful HTML Email to goldilocksmicrobakery@gmail.com
      const itemsHtml = items
        .map(
          (item: any) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <strong>${item.name}</strong>
              ${item.notes ? `<br/><span style="color: #666; font-size: 12px;">Note: ${item.notes}</span>` : ""}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price / 100).toFixed(2)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
          </tr>
        `
        )
        .join("");

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #3d312a; padding: 25px; text-align: center;">
            <h1 style="color: #dfb76c; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">NEW PRE-ORDER RECEIVED</h1>
            <p style="color: #f5f2eb; margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Goldilocks Micro-Bakery Internal Notification</p>
          </div>
          
          <div style="padding: 25px; background-color: #fff;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #3d312a; padding-bottom: 15px; margin-bottom: 20px;">
              <div>
                <span style="color: #888; font-size: 12px; text-transform: uppercase;">Order Reference</span>
                <h3 style="margin: 2px 0 0 0; color: #3d312a; font-size: 18px;">#${id || "N/A"}</h3>
              </div>
              <div style="text-align: right;">
                <span style="color: #888; font-size: 12px; text-transform: uppercase;">Pre-Order Date</span>
                <h3 style="margin: 2px 0 0 0; color: #b8860b; font-size: 18px;">${selectedDate || "N/A"}</h3>
              </div>
            </div>

            <div style="margin-bottom: 25px;">
              <h4 style="color: #3d312a; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 0;">Customer Information</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 4px 0; color: #666; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 4px 0;">${customerName || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #666;"><strong>Phone:</strong></td>
                  <td style="padding: 4px 0;">${customerPhone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 4px 0;">${customerEmail || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #666;"><strong>Delivery Method:</strong></td>
                  <td style="padding: 4px 0; text-transform: capitalize; font-weight: bold; color: #3d312a;">${deliveryMethod || "N/A"}</td>
                </tr>
                ${
                  deliveryMethod === "delivery"
                    ? `
                <tr>
                  <td style="padding: 4px 0; color: #666; vertical-align: top;"><strong>Address:</strong></td>
                  <td style="padding: 4px 0;">
                    ${deliveryAddress || ""}<br/>
                    ${deliveryCity || ""}, ${deliveryZip || ""}
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h4 style="color: #3d312a; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 0;">Order Details</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr style="background-color: #fcfbf7;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd; width: 60px;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd; width: 80px;">Price</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd; width: 90px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 10px 5px 10px; text-align: right; font-weight: bold; font-size: 16px;">Grand Total:</td>
                    <td colspan="2" style="padding: 15px 10px 5px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #b8860b;">$${(total / 100).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            ${
              notes
                ? `
            <div style="background-color: #faf7f2; border-left: 4px solid #dfb76c; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
              <h5 style="margin: 0 0 5px 0; color: #3d312a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Notes / Custom Requests</h5>
              <p style="margin: 0; font-size: 14px; font-style: italic; color: #555; white-space: pre-wrap;">"${notes}"</p>
            </div>
            `
                : ""
            }
          </div>
          
          <div style="background-color: #f5f2eb; padding: 15px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #888;">
            This email is an automated preorder notification generated by the Goldilocks Bakery System.
          </div>
        </div>
      `;

      // Check if SMTP is configured
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        console.log("[Backend] SMTP configuration found. Sending real email to goldilocksmicrobakery@gmail.com...");
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "587"),
          secure: parseInt(SMTP_PORT || "587") === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const info = await transporter.sendMail({
          from: SMTP_FROM || `"Goldilocks Bakery Notifications" <${SMTP_USER}>`,
          to: "goldilocksmicrobakery@gmail.com",
          subject: `🥐 New Pre-Order #${id || ""} [${selectedDate}] - ${customerName}`,
          html: emailHtml,
        });

        console.log(`[Backend] Email successfully sent: ${info.messageId}`);
      } else {
        console.log("\n==================================================");
        console.log("⚠️  EMAIL NOTIFICATION SIMULATION (SMTP NOT CONFIGED)");
        console.log("To send real emails, add SMTP credentials in the AI Studio secrets panel:");
        console.log("SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS");
        console.log("--------------------------------------------------");
        console.log(`Recipient: goldilocksmicrobakery@gmail.com`);
        console.log(`Subject: New Pre-Order #${id} - ${customerName}`);
        console.log(`Pre-Order Date: ${selectedDate}`);
        console.log(`Customer: ${customerName} (${customerPhone}) - ${customerEmail}`);
        console.log(`Total: $${(total / 100).toFixed(2)}`);
        console.log(`Items count: ${items.length}`);
        console.log("==================================================\n");
      }

      res.status(200).json({ success: true, message: "Order processed successfully and backend notification dispatched" });
    } catch (error: any) {
      console.error("[Backend Error] Failed to process order / send email:", error);
      res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const viteModule = "vite";
    const { createServer: createViteServer } = await import(viteModule);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
