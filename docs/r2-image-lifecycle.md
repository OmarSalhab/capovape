R2 image lifecycle - simple guide

This file explains how images are uploaded and removed from Cloudflare R2 in this project.
Keep it simple and use it when you come back later.

1) Overview
- Admin uploads one image per product in the Admin panel.
- The server uploads the image to a Cloudflare R2 bucket.
- The server stores two fields in the product document:
  - `image`: a public URL that can be used in the UI.
  - `imageKey`: the object key inside the R2 bucket (used to delete the image later).
- When the admin deletes a product, the server deletes the R2 object using `imageKey` and then removes the product document.

2) Required environment variables
Set these in `.env.local` (or your deployment environment):

- `R2_ACCOUNT_ID` - Cloudflare account id (used to build the upload/delete endpoint)
- `R2_BUCKET` - the R2 bucket name
- `R2_API_TOKEN` - an API token with permissions to PUT and DELETE objects in the R2 bucket

3) Upload flow (what happens when admin uploads an image)
- The Admin UI reads the selected image file and sends it to `POST /api/admin/r2/upload` in base64 form with file name and content-type.
- The server takes that base64 data and PUTs it to `https://<ACCOUNT_ID>.r2.cloudflarestorage.com/<BUCKET>/<KEY>` using the `R2_API_TOKEN` in the Authorization header.
- The server returns `{ ok: true, publicUrl, key }`.
- The Admin UI stores `publicUrl` in `image` and `key` in `imageKey` and sends both to the product create API.

4) Create product flow
- The Admin UI sends product data to `POST /api/admin/products` including `image` and `imageKey`.
- The server saves the product document in MongoDB with both fields.

5) Delete flow
- When an admin deletes a product, the server looks up the product by `productId`.
- If the product has `imageKey` and R2 env vars are present, the server calls `DELETE https://<ACCOUNT_ID>.r2.cloudflarestorage.com/<BUCKET>/<imageKey>` with the `R2_API_TOKEN`.
- The server ignores R2 errors (it logs them) and then deletes the product document from MongoDB.

6) Notes and recommendations
- For production, consider using presigned upload URLs so the browser uploads directly to R2 without sending large base64 payloads through your server.
- Make sure the `R2_API_TOKEN` has limited scope (only what it needs) and do not commit it to source control.
- Consider stricter delete semantics if you want to ensure images are always removed from R2 before deleting product records.
- Add file size/type validation to avoid storing huge images.

7) How to test quickly
- Set the env vars in `.env.local` and restart the dev server.
- Log in to the Admin panel, create a product with an image, and confirm the image appears.
- Check the product document in MongoDB - it should have `image` and `imageKey` fields.
- Delete the product and confirm the object is removed from the R2 bucket.

End of guide.
