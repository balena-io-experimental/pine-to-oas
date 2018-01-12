# pine-to-oas
Demo generating OpenAPI Specification from PineJS models

## To use

* Check out the repo
* Add a `model.json` in the root, matching the schema in lib/pine-schema.d.ts
* `npm install`
* `npm start`
* Open http://localhost:9080/

## To release

* Run `npm build` (or `npm start`)
* Commit and push `openapi.yml`

## TODO:

- [ ] Include non-GET operations
- [ ] Filter fields & tables by permissions
- [ ] Add parameters for filter/expand etc
- [ ] Add custom endpoints