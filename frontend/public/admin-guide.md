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

## 7. SEO editor: practical page-by-page workflow

The **SEO workspace** is for improving how existing pages are understood by search engines and visitors. It does not promise a first-page position. Search results can take time to update, and rankings depend on many factors outside the admin.

### Work on one URL

1. Open **SEO workspace** and find the exact URL in **SEO workbench · existing website URLs**. Select **Choose for SEO edit** to load the saved settings into the form. Use the arrow beside it to open the public page in another tab and read it first.
2. Set **Focus phrase** to the main real search need for that page, for example `Nashik local cab service`. Add a few closely related phrases in **Related keywords**. These are editorial planning fields; Google does not use a hidden keyword field to rank the page. Do not repeat phrases unnaturally.
3. Write a distinct **Search title** that names the service or destination and matches the page. Keep it concise (the form limit is 70 characters). Write a truthful **Search description** that explains the page and gives a visitor a reason to open it (the form accepts 30–320 characters). Google may choose different text for a result.
4. Leave **Canonical path** blank in normal cases. Blank means “this page is its own preferred URL.” Only enter another existing URL when a site owner or technical SEO has confirmed this page is a duplicate and specified the preferred URL.
5. Leave **Mark noindex** off for pages intended to appear in Google. Turning it on asks search engines not to show the page. If you are not sure, do not change it; ask the owner/technical contact.
6. Add **Page-specific SEO notes** for the next editor. These notes stay in the admin and are not shown on the public site. Useful notes include the target visitor, pages to link to, copy/image still needed, a Search Console query to check, and the date or reason for the next review.
7. Select **Save SEO settings** or **Update SEO settings**. This saves the metadata override to the database and applies it on the public URL immediately; SEO metadata has no Draft/Publish switch. Open the same URL in a new tab and check it. Search engines update their stored result later, not necessarily at once.

### Change a visible headline, paragraph or image

The SEO form changes search metadata; it does not change the text or image visitors see on the page. For visible content:

1. Open **Website content** and find the same URL.
2. Select **Edit content**. Change the page headline (H1), introduction, section headings/body, FAQs or hero image only in the relevant fields. Keep facts accurate and helpful; do not add invented fares, guarantees, opening hours, facilities or customer claims.
3. Use **Preview** to review the copy. A preview is a content preview, so also open the public page to check the full design.
4. Choose **Draft** to save privately while someone reviews it. Choose **Published** and save to put the page-content changes live. A scheduled item goes live on its scheduled date. After publishing, open the page on a phone and computer and check links, image crop, headings and text.
5. If a visible image is wrong, select an appropriate photo from **Photo library** and write alt text describing what is actually in the image. Do not stuff keywords into alt text.

If the page content is already correct and only its search title/description need adjustment, use the SEO workspace alone. If both need work, edit each section and verify both the public page and search metadata.

### Worked example: `/cities/nashik`

Open the Nashik page and decide what a visitor needs: for example, arranging a local cab, a station pickup, or a trip to a named nearby destination. The page already has its fixed URL; do not create another URL for the same page.

| Admin field | Example work for this page |
| --- | --- |
| Focus phrase | `Nashik local cab service` |
| Related keywords | `Nashik airport taxi, Nashik Road station cab, Nashik sightseeing cab` |
| Search title | Write a short, accurate title such as `Nashik Cab Service: Local and Outstation Trips` (adjust to fit the title limit and brand style). |
| Search description | Summarize the real services on this page and invite the visitor to enquire. Do not promise a fare, vehicle or availability that has not been confirmed. |
| Visible headline | Change in **Website content → `/cities/nashik` → Edit content**, not in the metadata form. |
| Main image | Choose a suitable Nashik image in the page editor; describe the actual image in alt text. The guide illustration below is an example image, not a required replacement. |
| Page-specific SEO notes | Example: `Review Nashik station pickup wording; link to the Nashik–Pune route; check Search Console queries after 30 days; confirm venue details before adding them.` |

![Nashik Ramkund example image](/images/cities/nashik-ramkund-clear.jpg)

After saving the SEO settings, check `/cities/nashik` on the public website. After changing visible page content, make sure the page is Published, save it, and check the same URL again. The save updates the website; search-result changes wait for Google to crawl and process the page. For reporting, **Performance** shows recorded enquiries; it does not show Google impressions or ranking positions. Connect the site to **Google Search Console** to monitor those search metrics and submit/check the sitemap.

### Blogs, internal links and promotion

- Use **Blog posts** for new editorial articles. Add one clear topic, headline, useful body, accurate summary, distinct SEO title/description, a suitable cover image and descriptive alt text. Save as **Draft** for review; set **Published** when approved. Check the resulting `/blogs/<slug>` URL.
- Link related pages using real site paths, such as `/cities/nashik` or a verified route URL. A link should help the reader continue their task. Check that links open the correct page.
- **Promotional banners** are on-site placements. Google Ads and Meta advertising, budgets and campaign results are managed in those platforms. The admin links to them; it does not launch or measure paid ads.
- Search Console is an external Google service. The current admin links to it but does not yet connect its search-query/impression/ranking data to the Performance dashboard. Ask the technical owner to configure verified property access and an API connection if those metrics need to appear inside this admin.
- Off-page work such as earning legitimate mentions and links, local business listing accuracy, and outreach is performed in the relevant external services. Do not buy spam links or publish fake reviews.

### Good review routine

Keep a short note of the page URL, what changed, why it helps the visitor, and what to measure. Revisit performance after enough time for search data to accumulate. If the page loses traffic or enquiries, compare the page and its search queries before editing again. Avoid changing URLs, canonical paths or noindex settings without technical review.

## 8. Campaigns and public site settings

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
