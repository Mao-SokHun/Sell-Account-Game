/**
 * Helper to draw a rounded rectangle on a canvas context
 */
function drawRoundRect(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  fillStyle = null,
  strokeStyle = null,
  lineWidth = 1,
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draw an authentic circular official stamp seal
 */
function drawOfficialStamp(ctx, centerX, centerY, radius = 62) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-0.15); // -8.5 degrees tilt for authentic stamp effect

  // Outer circle with dashed/solid double border
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Innermost circle
  ctx.beginPath();
  ctx.arc(0, 0, radius - 20, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Center text "PAID"
  ctx.fillStyle = "#10b981";
  ctx.font = 'bold 20px "Outfit", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PAID", 0, -4);

  // Subtext "ទូទាត់រួច"
  ctx.font = 'bold 10px "Kantumruy Pro", sans-serif';
  ctx.fillText("ទូទាត់រួចរាល់", 0, 14);

  // Arc text top & bottom
  ctx.font = 'bold 9px "Kantumruy Pro", sans-serif';
  ctx.fillStyle = "rgba(52, 211, 153, 0.9)";
  ctx.fillText("★ MIRA STORE OFFICIAL ★", 0, -radius + 14);
  ctx.fillText("★ ធានាសុវត្ថិភាព ១០០% ★", 0, radius - 12);

  ctx.restore();
}

/**
 * Generates an ultra-premium, high-resolution graphic invoice image (PNG)
 * @param {Object} data Order & credentials data
 * @returns {Promise<string>} Data URL of the generated PNG image
 */
export async function generateInvoiceImageUrl(data) {
  // Wait for Google Fonts to be fully active
  if (document && document.fonts) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn("Font loading wait skipped:", e);
    }
  }

  const {
    invoiceId = "RBX-" + Math.floor(100000 + Math.random() * 900000),
    productTitle = "Account Roblox Premium",
    category = "Roblox",
    level = "Max",
    priceUsd = "0.00",
    priceKhr = "0",
    purchaseDate = new Date().toLocaleString("km-KH"),
    credentials = {},
  } = data;

  const username = credentials.username || "N/A";
  const password = credentials.password || "N/A";
  const emailStatus =
    credentials.linkedEmail || "មិនទាន់ភ្ជាប់ (Unverified Email)";

  // Dimensions (Scale 2 for Ultra-Retina crispness)
  const scale = 2;
  const width = 760;
  const height = 1120;

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  // 1. Deep Space Gaming Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#060913");
  bgGrad.addColorStop(0.5, "#0b1122");
  bgGrad.addColorStop(1, "#070b16");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Ambient Glows
  const glow1 = ctx.createRadialGradient(
    width - 80,
    80,
    10,
    width - 80,
    80,
    260,
  );
  glow1.addColorStop(0, "rgba(99, 102, 241, 0.22)");
  glow1.addColorStop(1, "transparent");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(80, 480, 10, 80, 480, 240);
  glow2.addColorStop(0, "rgba(16, 185, 129, 0.16)");
  glow2.addColorStop(1, "transparent");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // 2. Main Outer Card Border
  const cardX = 22;
  const cardY = 22;
  const cardW = width - 44;
  const cardH = height - 44;
  const borderGrad = ctx.createLinearGradient(
    cardX,
    cardY,
    cardX + cardW,
    cardY + cardH,
  );
  borderGrad.addColorStop(0, "rgba(99, 102, 241, 0.6)");
  borderGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.5)");
  borderGrad.addColorStop(1, "rgba(6, 182, 212, 0.6)");
  drawRoundRect(
    ctx,
    cardX,
    cardY,
    cardW,
    cardH,
    26,
    "rgba(10, 16, 31, 0.6)",
    borderGrad,
    2,
  );

  // 3. Top Header Bar
  const headY = 46;
  // Brand Icon Logo - Draw official MIRA STORE logo
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "/images/logo.jpg";
    await new Promise((res) => {
      logoImg.onload = res;
      logoImg.onerror = res;
    });
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      ctx.save();
      drawRoundRect(ctx, 48, headY, 52, 52, 14);
      ctx.clip();
      ctx.drawImage(logoImg, 48, headY, 52, 52);
      ctx.restore();
      // subtle border
      drawRoundRect(ctx, 48, headY, 52, 52, 14, null, "rgba(56, 189, 248, 0.4)", 1.5);
    } else {
      const iconGrad = ctx.createLinearGradient(48, headY, 100, headY + 52);
      iconGrad.addColorStop(0, "#6366f1");
      iconGrad.addColorStop(1, "#06b6d4");
      drawRoundRect(ctx, 48, headY, 52, 52, 14, iconGrad);
      ctx.fillStyle = "#ffffff";
      ctx.font = 'bold 18px "Outfit", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MIRA", 74, headY + 26);
    }
  } catch (e) {
    const iconGrad = ctx.createLinearGradient(48, headY, 100, headY + 52);
    iconGrad.addColorStop(0, "#6366f1");
    iconGrad.addColorStop(1, "#06b6d4");
    drawRoundRect(ctx, 48, headY, 52, 52, 14, iconGrad);
    ctx.fillStyle = "#ffffff";
    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MIRA", 74, headY + 26);
  }

  // Brand Name & Subtitle
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 21px "Outfit", "Kantumruy Pro", sans-serif';
  ctx.fillText("MIRA STORE", 110, headY + 18);

  ctx.fillStyle = "#94a3b8";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText("ទីផ្សារទិញ-លក់ Account Game & Roblox", 110, headY + 40);

  // Official Receipt Pill Badge (Top Right)
  const pillW = 200;
  const pillH = 36;
  const pillX = width - 48 - pillW;
  drawRoundRect(
    ctx,
    pillX,
    headY + 6,
    pillW,
    pillH,
    18,
    "rgba(99, 102, 241, 0.15)",
    "rgba(99, 102, 241, 0.4)",
    1,
  );

  ctx.fillStyle = "#38bdf8";
  ctx.font = 'bold 12px "Kantumruy Pro", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("វិក្កយបត្រផ្លូវការ (RECEIPT)", pillX + pillW / 2, headY + 24);

  // Divider line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, 116);
  ctx.lineTo(width - 48, 116);
  ctx.stroke();

  // 4. Payment Success Banner (Green Ribbon)
  const bannerY = 132;
  const bannerH = 68;
  const bannerGrad = ctx.createLinearGradient(48, bannerY, width - 48, bannerY);
  bannerGrad.addColorStop(0, "#047857");
  bannerGrad.addColorStop(1, "#10b981");
  drawRoundRect(
    ctx,
    48,
    bannerY,
    width - 96,
    bannerH,
    16,
    bannerGrad,
    "rgba(52, 211, 153, 0.4)",
    1.5,
  );

  // Checkmark circle inside banner
  ctx.beginPath();
  ctx.arc(84, bannerY + 34, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = "#059669";
  ctx.font = 'bold 20px "Outfit", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✓", 84, bannerY + 35);

  // Banner text
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 16px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "ការទូទាត់តាមបាគង KHQR ជោគជ័យ ១០០% (VERIFIED)",
    116,
    bannerY + 26,
  );

  ctx.fillStyle = "#d1fae5";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "គណនីបានផ្ទៀងផ្ទាត់រួចរាល់ អាច Login ចូលលេងក្នុងហ្គេមបានភ្លាមៗ",
    116,
    bannerY + 48,
  );

  // 5. Metadata Grid Card (Invoice ID, Date, Item, Total Paid)
  const metaY = 218;
  const metaH = 120;
  drawRoundRect(
    ctx,
    48,
    metaY,
    width - 96,
    metaH,
    18,
    "rgba(15, 23, 42, 0.85)",
    "rgba(255, 255, 255, 0.08)",
    1,
  );

  // Grid line vertical
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.beginPath();
  ctx.moveTo(width / 2, metaY + 14);
  ctx.lineTo(width / 2, metaY + metaH - 14);
  ctx.stroke();

  // Grid line horizontal
  ctx.beginPath();
  ctx.moveTo(68, metaY + metaH / 2);
  ctx.lineTo(width - 68, metaY + metaH / 2);
  ctx.stroke();

  // Cell 1: Invoice ID
  ctx.fillStyle = "#94a3b8";
  ctx.font = '11px "Kantumruy Pro", sans-serif';
  ctx.fillText("លេខវិក្កយបត្រ (Invoice ID)៖", 70, metaY + 28);
  ctx.fillStyle = "#38bdf8";
  ctx.font = 'bold 17px "Outfit", monospace';
  ctx.fillText(invoiceId, 70, metaY + 48);

  // Cell 2: Date
  ctx.fillStyle = "#94a3b8";
  ctx.font = '11px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "កាលបរិច្ឆេទបញ្ជាទិញ (Date & Time)៖",
    width / 2 + 24,
    metaY + 28,
  );
  ctx.fillStyle = "#f1f5f9";
  ctx.font = 'bold 13px "Kantumruy Pro", sans-serif';
  ctx.fillText(purchaseDate, width / 2 + 24, metaY + 48);

  // Cell 3: Account Package
  ctx.fillStyle = "#94a3b8";
  ctx.font = '11px "Kantumruy Pro", sans-serif';
  ctx.fillText("កញ្ចប់គណនី Roblox (Account Item)៖", 70, metaY + 86);
  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 13px "Kantumruy Pro", sans-serif';
  const displayTitle =
    productTitle.length > 32 ? productTitle.slice(0, 32) + "..." : productTitle;
  ctx.fillText(displayTitle, 70, metaY + 104);

  // Cell 4: Amount Paid
  ctx.fillStyle = "#94a3b8";
  ctx.font = '11px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "ចំនួនទឹកប្រាក់ទូទាត់ (Total Paid)៖",
    width / 2 + 24,
    metaY + 86,
  );
  ctx.fillStyle = "#10b981";
  ctx.font = 'bold 18px "Outfit", sans-serif';
  const priceDisplay = priceUsd
    ? `$${priceUsd} (~ ${priceKhr} ៛)`
    : `${priceKhr} ៛`;
  ctx.fillText(priceDisplay, width / 2 + 24, metaY + 104);

  // 6. Confidential Credentials Card (Purple/Navy Card)
  const credY = 356;
  const credH = 260;
  drawRoundRect(
    ctx,
    48,
    credY,
    width - 96,
    credH,
    20,
    "rgba(12, 18, 36, 0.95)",
    "rgba(99, 102, 241, 0.45)",
    1.5,
  );

  // Section Header inside card
  ctx.fillStyle = "#c7d2fe";
  ctx.font = 'bold 14px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "🔐 ព័ត៌មានសម្ងាត់សម្រាប់ចូលលេង (ACCOUNT LOGIN CREDENTIALS)",
    72,
    credY + 30,
  );

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.moveTo(70, credY + 44);
  ctx.lineTo(width - 70, credY + 44);
  ctx.stroke();

  // Field 1: Username
  ctx.fillStyle = "#94a3b8";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText("ឈ្មោះគណនីចូលលេង (Username)៖", 72, credY + 70);

  drawRoundRect(
    ctx,
    70,
    credY + 80,
    width - 140,
    44,
    10,
    "rgba(6, 9, 18, 0.85)",
    "rgba(255, 255, 255, 0.12)",
    1,
  );
  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 17px "Courier New", monospace';
  ctx.fillText(username, 88, credY + 108);

  // Field 2: Password
  ctx.fillStyle = "#94a3b8";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText("ពាក្យសម្ងាត់ចូលលេង (Password)៖", 72, credY + 146);

  drawRoundRect(
    ctx,
    70,
    credY + 156,
    width - 140,
    44,
    10,
    "rgba(6, 9, 18, 0.85)",
    "rgba(255, 255, 255, 0.12)",
    1,
  );
  ctx.fillStyle = "#38bdf8";
  ctx.font = 'bold 17px "Courier New", monospace';
  ctx.fillText(password, 88, credY + 184);

  // Field 3: Clean Account Security Badge
  ctx.fillStyle = "#94a3b8";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText("ស្ថានភាពគណនី៖", 72, credY + 232);
  ctx.fillStyle = "#10b981";
  ctx.font = 'bold 12px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "គណនីស្អាត ១០០% (Clean Account - គ្មានជាប់ 2FA / គ្មានជាប់ Email)",
    175,
    credY + 232,
  );

  // 7. Security Advisory Card (Red Accents)
  const secY = 632;
  const secH = 132;
  drawRoundRect(
    ctx,
    48,
    secY,
    width - 96,
    secH,
    16,
    "rgba(239, 68, 68, 0.08)",
    "rgba(239, 68, 68, 0.35)",
    1.2,
  );

  ctx.fillStyle = "#f87171";
  ctx.font = 'bold 13px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "🛡️ សេចក្តីណែនាំបន្ទាន់ក្នុងការការពារគណនី (SECURITY ACTIONS)៖",
    70,
    secY + 28,
  );

  ctx.fillStyle = "#e2e8f0";
  ctx.font = '12px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "១. ចូលទៅកាន់គេហទំព័រ roblox.com ហើយ Login ជាមួយ Username & Password ខាងលើ",
    72,
    secY + 54,
  );
  ctx.fillText(
    "២. ចូលទៅកាន់ Settings > Account Info ដើម្បីដាក់ Email និងលេខទូរស័ព្ទផ្ទាល់ខ្លួនរបស់អ្នក",
    72,
    secY + 78,
  );
  ctx.fillText(
    "៣. ផ្លាស់ប្តូរលេខសម្ងាត់ (Password) ថ្មីជាបន្ទាន់ ដើម្បីគ្រប់គ្រងគណនីផ្តាច់មុខ ១០០%",
    72,
    secY + 102,
  );

  // 8. Verification & QR Code & Official Stamp Section
  const botY = 780;
  const botH = 186;
  drawRoundRect(
    ctx,
    48,
    botY,
    width - 96,
    botH,
    18,
    "rgba(15, 23, 42, 0.65)",
    "rgba(255, 255, 255, 0.06)",
    1,
  );

  // Security Information (Clean left alignment, no QR verify)
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 16px "Kantumruy Pro", sans-serif';
  ctx.fillText("ធានាសុវត្ថិភាព ១០០% ដោយ MIRA STORE", 80, botY + 45);

  ctx.fillStyle = "#94a3b8";
  ctx.font = '13px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "• គណនីស្អាត មិនជាប់ Hack មិនជាប់ 2FA អាចដាក់ Email ផ្ទាល់ខ្លួនបានភ្លាមៗ",
    80,
    botY + 74,
  );
  ctx.fillText(
    "• ប្រព័ន្ធស្វ័យប្រវត្តិ ២៤ ម៉ោង តាមស្តង់ដារ KHQR ទទួលគណនីភ្លាមៗ",
    80,
    botY + 98,
  );
  ctx.fillText(
    "• សេវាបម្រើអតិថិជន Telegram Support: @Mirastore10",
    80,
    botY + 122,
  );

  ctx.fillStyle = "#38bdf8";
  ctx.font = 'bold 12px "Outfit", monospace';
  ctx.fillText(
    `AUTHENTICATION SIGNATURE: ${invoiceId}-SECURED`,
    80,
    botY + 152,
  );

  // Official Stamp Seal (Right Side)
  drawOfficialStamp(ctx, width - 130, botY + 92, 64);

  // 9. Footer Bar & Disclaimer
  const footY = 992;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.moveTo(48, footY);
  ctx.lineTo(width - 48, footY);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#64748b";
  ctx.font = '11px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    "សូមរក្សារូបភាពវិក្កយបត្រនេះទុកជាឯកសារយោង និងជាភស្តុតាងនៅពេលត្រូវការជំនួយពីម្ចាស់ហាង",
    width / 2,
    footY + 22,
  );

  ctx.fillStyle = "#475569";
  ctx.font = '10px "Outfit", sans-serif';
  ctx.fillText(
    "© 2026 MIRA STORE CAMBODIA. ALL RIGHTS RESERVED.",
    width / 2,
    footY + 42,
  );

  return canvas.toDataURL("image/png");
}

/**
 * Trigger browser download of the generated invoice PNG
 */
export async function downloadInvoiceImage(data) {
  const imageUrl = await generateInvoiceImageUrl(data);
  const invoiceId = data.invoiceId || "RBX-" + Date.now();
  const username = (data.credentials && data.credentials.username) || "Account";

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = `Invoice_${invoiceId}_${username}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
