# Vistar Cabs project and admin guide

This guide explains what is in the Vistar Cabs project and how to use its admin workspace. The admin workspace is designed for regular website updates and business records. You do not need to edit source code to add an approved customer review or update content that the editor supports.

## 1. What makes up the project

The project has three main parts:

- `frontend/` is the public website and admin interface. It uses Next.js, React and TypeScript.
- `backend/` is the API. It handles sign-in, enquiry forms and admin data.
- MongoDB stores enquiries, page edits, customer feedback, campaigns, media and operational records. Production uses MongoDB Atlas.

The project includes city, route, airport and destination pages, service information, a trip enquiry form and the admin workspace. Website enquiries are saved to the API and database. The form then opens WhatsApp with a prepared message; the customer must press **Send** in WhatsApp for the message to be delivered.

### Local development

To run the project on your computer, start the backend and frontend in two Git Bash terminals. The backend needs its private `backend/.env` configuration and access to MongoDB.

In the first terminal:

```bash
cd /d/Kura/VistarCabsServices/backend
npm install
npm run dev
```

In a second terminal:

```bash
cd /d/Kura/VistarCabsServices/frontend
npm install
npm run dev
```

Open `http://localhost:3000` for the website and `http://localhost:3000/vistar-console` for the local admin. The API health check is `http://localhost:5000/api/health`. A healthy response includes `"ok":true` and `"storage":"mongodb"`.

Keep both terminals running while using the local site. Never put `.env` files, passwords or the MongoDB connection string into Git, screenshots or chat.

### Live site and code changes

The live website is hosted on Hostinger and this project is connected to GitHub. When a code or layout change is needed, edit the project, review it, then push the intended files to the connected branch. Hostinger must complete its deployment before the live site changes. Check the Hostinger deployment result and then review the page on the live domain, including on a phone.

Text, approved feedback and other supported records saved in the admin are stored by the backend; they do not require a Git commit. A new layout, form behavior, page template, or feature is a code change and does require a new deployment. Admin edits do not change MongoDB connection settings or rewrite the project code.

## 2. Open and sign in to the admin

1. Open the live website and go to `/vistar-console`. For local development, use `http://localhost:3000/vistar-console`.
2. Sign in with the owner or SEO editor account set up for the backend. Production credentials are not the local development demo account.
3. The name at the top shows your role. The owner sees the operational sections as well as website tools. The SEO editor sees website content tools but not owner-only business records.
4. On a phone, the section menu scrolls horizontally. Tap the section name you need.
5. Use the refresh button to reload the current section. Use **Sign out** when finished, especially on a shared computer.

Admin sessions expire after eight hours. The backend, frontend and API must be available for admin data to load. A red message in the workspace gives the API error returned for the current screen.

## 3. What each admin section does

| Section | What it is for |
| --- | --- |
| **Overview** | Quick counts and shortcuts to common work. A dash or load error means the workspace did not receive that data yet. |
| **Performance** | Website and enquiry activity over the available 30-day or 90-day view. Treat it as a summary of recorded activity, not a booking forecast. |
| **Inquiries** *(owner)* | Search trip requests by name, phone or route; filter by **new**, **contacted**, or **closed**; check journey details; and update the follow-up status. The phone number is a tap-to-call link. |
| **Website Pages** | Find built-in routes, add content to supported pages, create CMS pages, preview edits, publish, schedule, archive and restore saved revisions. |
| **SEO settings** | Set a search title and description for an existing page, set its canonical path, add an internal focus phrase, or mark it `noindex`. |
| **Site campaigns** | Create an on-site homepage banner with text, image, button, priority, dates and status. This does not create paid Google or social-media advertising. |
| **Customer feedback** | Save real customer quotes with approved display names and consent. Published, consent-confirmed entries can appear on the public website. |
| **Photo library** | Upload and manage images used by supported page editors, campaigns and vehicle records. |
| **Customers** *(owner)* | Keep a business contact profile, service notes and tags when there is a real service need. Marketing consent is optional and off by default. |
| **Corporate duty slips** *(owner)* | Prepare, update, print and track corporate trip slips with guest, route, driver, vehicle and trip cost details. |
| **Vehicles** *(owner)* | Maintain private fleet records such as category, seats, luggage, registration, city, image and active/maintenance status. |
| **Drivers** *(owner)* | Maintain driver contact, home city, assigned vehicle, availability/status and internal notes. |
| **Site settings** | Update supported public phone, WhatsApp, email, social links, operating hours and coverage summary. Save to apply the supported settings to the site. |
| **Change history** *(owner)* | Review recent admin actions, who made them, their role and when they were made. |

The admin is not a visual page designer. It cannot change CSS, rearrange the site's layout, create new application features, or change the hosting and database setup. Ask for a code change when the editor does not provide the field or behavior you need.

## 4. Add customer feedback to the website

You do **not** paste a review into a source-code file. Add it in the admin; the public site reads approved published feedback from the backend.

Before entering a quote, get the customer's permission to publish the exact words and the name you plan to show. Use a first name or an approved display name if that is what the customer agreed to. Do not invent a review, customer, rating or trip.

1. Sign in to `/vistar-console` and open **Customer feedback**.
2. In **Approved display name**, enter the name the customer agreed to display.
3. In **Rating**, select the rating the customer actually gave, from 1 to 5.
4. In **Exact customer feedback**, paste the customer's approved wording. Keep the meaning and wording accurate; do not add claims or rewrite the review to sound stronger.
5. Optionally add a short **Trip label**, such as `Nashik to Pune` or `Airport transfer`. Avoid private trip details.
6. Under **Publication**, choose **Draft** to save it privately for review or **Published** to make it eligible for the public feedback section. Choose **Archived** to keep it out of the public feed.
7. Tick the consent confirmation. It is required before the admin will save the record.
8. Select **Save feedback**. Wait for the green “Saved successfully” message.
9. If you selected **Published**, open the live homepage and check the Customer feedback area. Public feedback may take about a minute to refresh because the public API briefly caches this list.

The quote must be at least 15 characters and no more than 1,200 characters. The display name must be at least 2 characters. If a save fails, check the displayed message and confirm the required fields and consent box.

To correct a record, select **Edit**, make the change, confirm consent again, and select **Update feedback**. To take a record off the website, edit its publication status to **Archived** and save. **Remove** also archives the feedback record; do not use it as a way to permanently erase a record.

## 5. Add a photo and use it in content

1. Open **Photo library** and choose a JPG, PNG or WebP image no larger than 4 MB.
2. Write accurate **Accessible alt text** describing what is actually visible in the image. Alt text helps visitors using screen readers and should not be a list of search keywords.
3. Select **Upload image**. After it appears, use **Copy image ID**.
4. Open the relevant page, campaign or vehicle editor and paste that ID into its image field. Add the image's alt text there too if that field is provided.
5. Save or publish the item, then check the public result on mobile and desktop.

Use images Vistar Cabs owns or has permission to use. Never upload private customer documents or sensitive personal images. Deleting a photo can break content that uses it, so check before removing one.

## 6. Edit or create website pages

### Find an existing page

1. Open **Website Pages** and select **Browse pages**.
2. Search by a page name, city, airport or route. Use the type and status filters to narrow the list.
3. Select **View** to open the current page or **Edit content** to change supported copy for a built-in route.
4. Confirm the page path before saving. Built-in URLs are fixed in this editor.

For a built-in page, **Add sections to current page** keeps the coded page and adds your saved content. **Replace main page body** replaces the main body content with the H1, introduction, sections and FAQs you enter. This can significantly change what visitors see, so preview and ask the owner to review before publishing.

The admin's preview shows the editable content, not the full live page design. After publishing, use **Open live page** and check mobile and desktop. Archiving a built-in page edit removes its content override and returns the page to its coded template; it does not delete the URL.

### Create a CMS page

1. In **Website Pages**, choose **Create a page** or open **Create / manage CMS pages**.
2. Set the URL slug once, then add a page title, H1, search title, description and introduction.
3. Add useful sections with headings and body text. Add FAQs only when they answer real visitor questions. Use an internal link such as `/cities/nashik` or a verified HTTPS link.
4. To add images, upload them in **Photo library** first, then paste the image ID and alt text into the page.
5. Keep the page as **Draft** while it is being reviewed. Use **Schedule** only when the page is ready and you have selected a future publication date. Choose **Published** to put it live now.
6. Preview, save, then open the live URL and check the result. CMS pages use `/pages/<slug>`; the slug cannot be changed after the page is first saved.

Archived CMS pages are hidden from visitors but kept as records. Draft and archived pages are not public.

### Restore an earlier page version

Open the page editor's **Revision history**, review who saved each version and when, then choose **Restore this version** for the version you want. The current version is preserved in history before the restore. Preview and check its publication status afterward; restoring content does not automatically mean you should publish it.

## 7. SEO settings, campaigns and public site settings

### SEO settings

Choose an existing page path and provide a clear search title and description that match that page. Keep the canonical path on the correct existing URL. `noindex` asks search engines not to show the page in search results; do not turn it on for a public page without a reason. The focus phrase is an editing aid and is not shown as a guarantee of ranking. SEO settings cannot guarantee indexing, traffic or a ranking position.

### Site campaigns

Create an on-site banner with an internal name, public heading, short text, button label and a valid site path or HTTPS URL. If using an image, choose one from Photo library and add accurate alt text. Set dates and priority intentionally. **Active** campaigns display only during their date window; **Draft**, **Paused** and **Archived** campaigns do not display. Check the homepage after saving. This tool does not manage external advertising accounts or spend.

### Site settings

Check every phone number, WhatsApp country code, email address and social URL carefully before saving. The WhatsApp field expects country code plus digits, without spaces or punctuation. Blank social fields stay hidden. Use confirmed operating hours and a truthful coverage summary only.

## 8. Owner-only business sections

- **Inquiries:** move each request through `new` → `contacted` → `closed` as follow-up happens. This status is a tracking aid; it does not automatically send a message or book a cab.
- **Customers:** add only contacts needed for service work. Do not put passwords, card details, identity scans or unrelated personal information in notes. Turn on marketing consent only when the customer explicitly agreed.
- **Corporate duty slips:** enter the company, guest, date, route, pickup and drop, assigned driver and vehicle, kilometre readings and trip amounts as available. Review the printed slip before sharing it with the company or guest.
- **Drivers and vehicles:** keep availability and assignments current. These are private admin records; they do not create a public live booking system.
- **Change history:** use this to check which admin account changed a record. It is an audit list, not a restore button for every record type.

Treat customer and driver details as private business information. Share them only with people who need them for the trip.

## 9. Safe update checklist

Before publishing or saving:

- Confirm the correct page, customer or record.
- Check spelling, phone numbers, routes, dates, links and image alt text.
- Verify travel facts and business claims. Do not promise fares, availability, safety checks or service features unless the owner confirms them.
- Get customer permission before displaying a quote or name.
- Use Draft first when you want another person to review the change.
- After publishing, check the live page on both a phone and a computer.
- Use page revision history to restore an earlier saved page if needed.

## 10. Common problems

**Admin says the API returned an empty or invalid response:** The browser reached something, but it did not return the JSON response the admin expects. Check that the live API origin and website `/api` proxy point to the current backend deployment. On local development, make sure both backend and frontend are running. Check `http://localhost:5000/api/health` locally; do not paste `.env` values into a support message.

**Sign-in fails:** Check that you are using the right role account and the backend is running. If an owner changes admin credentials in the private backend environment, the backend must be restarted or redeployed. Never share a password to troubleshoot.

**A save fails:** Read the red message, check required fields and character limits, and try again. Check whether the session expired; sign in again if needed. If the API or database is unavailable, wait for it to be restored and then reload the section.

**A review does not appear publicly:** Confirm its status is **Published**, the consent box was checked and the save succeeded. Refresh the homepage after a short wait. Draft and archived reviews are not returned to the public site.

**A page update is not visible:** Confirm the page or campaign is published/active and that any schedule date has passed. Refresh the live URL and check that you are viewing the correct Hostinger deployment. A saved admin edit and a GitHub code deployment are different workflows.

**You need a layout or feature change:** The admin editor changes supported content only. Request a code update, build it, and deploy the code through the project's GitHub/Hostinger workflow.
