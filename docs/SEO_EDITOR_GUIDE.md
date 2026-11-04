# SEO editor guide

The SEO editor account is for managing approved website content and search metadata. Sign in at `/admin` with the SEO username and password configured in `backend/.env` as `SEO_ADMIN_USERNAME` and `SEO_ADMIN_PASSWORD`. Ask the owner to create or provide the account securely. Do not share credentials in the project ZIP.

## Find and edit an existing page

1. Sign in and open **Website Pages**.
2. Search by page name, city, airport or route. Use the page-type and status filters to narrow the list.
3. Choose **Edit content** for an existing built-in route or **Edit page** for a CMS page. Use **View** to open the public URL.
4. Check the page name and URL before editing. Existing built-in URLs and saved CMS slugs are fixed in this editor.
5. Update the supported title, introduction, sections, FAQs, image and alt text. Keep facts accurate and relevant to that specific page.
6. Preview, save as draft, schedule, or publish. After publishing, open the live page on desktop and mobile.

## Draft, publish, archive and restore

- **Draft:** save work for later review without making the changes public.
- **Preview:** inspect the editable content before saving or publishing. A content preview may not show the full live page layout.
- **Schedule:** set a future publishing time when the editor offers this option.
- **Publish:** make approved content visible on the website.
- **Archive:** remove a CMS page from public output or archive a content override. A built-in route remains available with its original coded template.
- **Revision history:** restore a prior saved version if a published change needs to be reversed.

## Create a page

Use **Create a page** in the page-management area. Choose a clear slug and write a unique page title, heading, introduction, sections and FAQs. Add a distinct meta title and description. Keep a new page in draft or noindex while it is being reviewed. Once a CMS slug is saved, it cannot be renamed here. Do not create duplicate or very thin pages for minor keyword variations.

## SEO settings

Open **SEO settings** and select the page path. Write an accurate, distinct title and concise description that match the page. Keep its canonical path aligned with the approved URL. Use noindex for drafts or pages that should not appear in search. Metadata is a guide for search engines; it does not guarantee indexing, rankings or traffic.

## Images, feedback and campaigns

- Upload only approved, optimized images. Add descriptive alt text that explains the image in context.
- Publish customer feedback only when the quote and display name are genuine and the customer has approved public use. Never create sample reviews or ratings.
- On-site campaign banners need accurate copy, destination link and active dates. This tool does not launch Google or social-media ad campaigns.

## Editorial checklist

- The content answers a real visitor question and is specific to the page.
- Names, places, travel facts, dates, contact details and service claims are checked with the owner or a reliable source.
- Page title, description, heading and canonical path are appropriate and not copied from another page.
- Images have permission for use and accurate alt text; internal links open the intended page.
- The page was previewed, saved with the intended status, and checked after publishing on phone and desktop.

## Access limits

The SEO role manages supported page content, SEO metadata, media, approved feedback and public site settings. It cannot change arbitrary code or CSS, redesign templates, change existing URLs, set redirects, alter server or database configuration, deploy the website, manage customer enquiries or access external advertising accounts. Ask the owner or developer when a change needs those permissions.
