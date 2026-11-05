# Owner admin panel guide

The admin panel is at `/vistar-console` on the website. The owner account has access to operational enquiries and the wider website management tools. Keep the username, password and signed-in device private.

## Sign in and sign out

1. Start the backend and frontend as described in the main README.
2. Open `http://localhost:3000/vistar-console`.
3. Sign in with the owner username and password configured in `backend/.env` as `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
4. Use the admin navigation to open a section. Sign out when finished, especially on a shared computer.

If credentials change, restart the backend. Never send passwords or the MongoDB URI in screenshots or messages.

## View and follow up on enquiries

Open **Inquiries** to review saved trip requests. Open an entry to inspect its trip type, route, date/time and callback details. Use the status and notes controls available in the record to track follow-up. Contact the customer using the details they provided and record only useful, appropriate follow-up information.

Enquiries are saved to MongoDB before the website opens WhatsApp. WhatsApp delivery is a separate customer action: the customer must press Send in their WhatsApp app. If an enquiry is missing, first check that the API health page reports MongoDB storage, then verify the selected database and `inquiries` collection in Atlas.

## Customer, driver and vehicle records

Owner-only operational sections can show customer information and manage customer, driver and vehicle records. Enter only information the business needs. Do not store identity scans, passwords, payment details or unrelated personal information in free-text notes.

## Website pages and content

Use **Website Pages** to find existing built-in pages and CMS pages. Search or filter the list, then open the page editor. You can edit supported page copy, sections, FAQs, images and metadata, save a draft, preview, schedule, publish, archive or restore earlier versions. Built-in page URLs stay fixed. Archiving an edit to a built-in page restores its original coded content; it does not remove that route from the website.

## Media, feedback and homepage campaigns

- **Media:** add approved images with meaningful alt text. Keep image files optimized and avoid uploading private material.
- **Reviews/feedback:** publish only real customer feedback with permission to display it. Do not invent a name, quote or rating.
- **Site campaigns:** prepare an on-site homepage banner with accurate text, image, link and dates. This does not buy or manage external advertisements.

## Site settings and SEO

Use site settings for supported public contact and website details. SEO controls manage supported page titles, descriptions, canonical paths and indexing choices. Check each edited page on the live site after publishing. Changing website content does not guarantee a search ranking or a specific number of enquiries.

## Troubleshooting

- **Cannot sign in:** check the owner credentials in the backend `.env`, confirm the API is running, then restart it after any credential change.
- **No enquiries appear:** check `http://localhost:5000/api/health`, confirm it reports `ok: true` and `storage: mongodb`, and inspect the `vistar_cabs` database's `inquiries` collection in MongoDB Atlas.
- **Changes are not visible:** confirm the content is published and refresh the page. Check that the browser is open to the same project/server you edited.
- **Need to undo content:** use the page's revision history and restore a previous saved version.

For setup and environment examples, see the main [README](../README.md). The admin can edit supported content and records; code, layout changes, deployments, URL migrations and external advertising accounts may still require a developer or owner platform access.
