# Vistar Cabs Admin and SEO Editor Guide

This guide describes the current admin workspace in this project. Open the website and go to `/admin`. Use your own account; do not share a password in chat, email, screenshots, or the project ZIP.

## Sign in and account setup

1. Start the backend and frontend using the project README instructions.
2. Open `http://localhost:3000/admin` (or the deployed website's `/admin` address).
3. Enter the owner account configured with `ADMIN_USERNAME` and `ADMIN_PASSWORD`, or the SEO account configured with `SEO_ADMIN_USERNAME` and `SEO_ADMIN_PASSWORD` in the backend's private `.env` file.
4. Restart the backend after changing those environment values. The account is not created from the login screen. In local development only, the sign-in screen shows a demo owner account if the environment credentials are unset. Replace demo credentials before any shared or public deployment.
5. Sign out when finished, especially on a shared device. Sessions expire after eight hours.

Admin access is role-based. The owner can manage operational customer, inquiry, driver and vehicle records. The SEO role can work with website content, SEO, media, approved feedback and site campaigns. The server checks authorization; hiding a menu item is not the only protection.

## Find a page that is already on the website

1. Select **Website Pages** in the admin navigation.
2. Open **Browse pages**. The inventory includes the configured built-in routes (home, services, cities, airports, destination guides and intercity routes) plus CMS pages created from the admin.
3. Search by a label, city, airport or route, or filter by page type and status.
4. Select **Edit content** for a built-in page or **Edit page** for a CMS page. **View** opens its current website URL in a new tab.
5. Existing URLs are fixed. Editing a page does not rename its URL. CMS page slugs are locked after initial creation. If a genuinely new URL is required, create a separate page and ask the owner/developer to review its links and SEO implications; do not replace an existing page URL from this editor.

The directory count describes routes configured in this project and CMS records in the database. It does not say how many pages Google has indexed or how many pages are deployed in another project copy.

## Edit an existing built-in page

1. From the directory, choose **Edit content**. You can also use **Edit built-in page** and select the URL.
2. Confirm the label and URL before typing. The **Page treatment** choice is important:
   - **Add sections to current page** keeps the existing page design/content and adds the sections and FAQs you enter.
   - **Replace main page body** makes your replacement H1, intro and sections the page body. It can significantly change what visitors see; use the draft preview and get an owner review first.
3. Add/remove sections and FAQs as needed. For images, select a media-library ID and provide descriptive alt text. Use internal website paths for relevant links and only verified facts.
4. Select **Preview these changes before saving** to check the editable copy. This preview shows content structure only; it does not render the complete responsive live page.
5. Select **Save draft** to keep changes out of public display, **Schedule changes** to set a future India date, or **Publish changes** to make them public now.
6. Use **Open live page** to inspect the website after publishing. Check mobile and desktop. The directory's status describes this content override; an untouched built-in route is already served by its built-in template.
7. To return a built-in route to the original template, archive its content override or use **Restore original page**. The route itself stays live with its coded template; this does not delete the URL.

## Create, publish, schedule or archive a CMS page

1. Select **Create a page** (or **Create / manage CMS pages**).
2. Add a URL slug once, plus a title, H1, SEO title, meta description, introduction and useful sections/FAQs. The URL will be `/pages/<slug>` and the slug becomes read-only after first save.
3. Keep **noindex** selected while the draft is under review. Clear it only when content and metadata are ready for search indexing.
4. Use the preview before saving. Save as draft, select a future publication date and schedule, or publish now.
5. Choose **archived** to remove the CMS page from public display without deleting its record. It can be edited and published again later. Draft and archived pages are not public and should not appear in the sitemap.

## Review and restore earlier versions

For an existing page or a CMS page that has been saved at least once, open **Revision history**. Each entry shows who saved it and when. Choose **Restore this version** and confirm. The current state is saved as another history entry before the selected snapshot is restored. Check its status and URL, then preview and publish if needed. Creating a draft does not publish it.

## SEO metadata and page discovery

Use **SEO settings** to choose the existing route, set a unique title and description, review its canonical path, add a focus phrase for editorial reference, and control `noindex`. Keep canonical paths on the approved existing URL unless the owner/developer confirms a technical SEO change. Metadata controls do not guarantee ranking, traffic or indexing. Use the sitemap and Search Console separately to check Google's observed URLs and performance.

Do not add unsupported service claims, guaranteed availability/fares, invented reviews or unverified event dates. Have the owner approve business claims. The feedback section accepts only actual customer words and approved display names; confirm consent before publishing.

## Images and homepage banners

- **Photo library:** upload approved JPG, PNG or WebP images within the configured size limit, add accurate alt text, and use the generated media entry in page sections. Avoid customer/private images unless authorized.
- **Site campaigns:** create an on-site homepage banner with a truthful headline, image, CTA and date range; preview the public homepage. Draft, paused and archived campaigns are not displayed. This section does not create or pay for Google, Meta or other external ads.

## What the SEO editor can and cannot change

The editor can manage content fields, page sections and FAQs, existing-page content additions/replacements, CMS pages, supported SEO metadata, approved media, approved customer feedback, site details available to the role and on-site homepage banners. The owner has additional operational data access.

This is not a visual website builder and does not permit arbitrary code, CSS/layout edits, new dynamic data models, URL rewrites, redirects, custom integrations, deployment, server configuration, ad account access or payment changes. Those require developer work and/or the relevant owner platform accounts. Existing built-in routes are not deleted when their copy is archived; their coded template remains at the same URL.

## Safe publishing checklist

- Correct route and existing URL selected.
- Claims, travel facts, contact details and customer permissions checked with the owner.
- Title and description are unique and accurate; canonical and noindex choices reviewed.
- Preview reviewed; links and image alt text checked.
- Draft/scheduled/published/archived status intentionally selected.
- Live desktop and mobile page opened after publishing; revision history available for rollback.

## Troubleshooting

- **Can't sign in:** confirm the correct backend `.env`, role credential variable names, backend restart and frontend/backend origins. Do not paste MongoDB URIs or passwords into support requests.
- **No built-in pages in directory:** sign in again, open Website Pages and refresh. If the page catalog is absent, verify the project copy and frontend build; the built-in catalog is shipped with frontend source, while CMS records are loaded from the backend.
- **Save fails:** read the displayed validation message, required fields, character limits and future date requirement. Check backend logs and MongoDB health privately.
- **Published update is not visible:** refresh the route; verify its status is published or its schedule date has passed. Check whether another project's local server or deployment is being viewed.
- **Need to undo a save:** use Revision history. For a built-in page, Restore original page removes its editable overlay and reveals the source template again.
