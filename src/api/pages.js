import resource from 'resource-router-middleware';

export default ({ base: { failRequest }, config, models: { pages }, pageValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'page',

	load(req, id, callback) {
		pages.queries.findOne(id)
		.then(_ => callback(null, _))
		.catch(callback);
	},

	/** GET / - List all entities */
	index({ params, query }, res) {
		const modifiedQuery = pageValidator.castIndexQuery(query);
		pages.queries.findAll(modifiedQuery)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		pages.queries.create(body)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** GET /:id - Return a given entity */
	read({ page }, res) {
		res.json(page);
	},

	/** PUT /:id - Update a given entity */
	update({ page, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				page[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ page }, res) {
		pages.splice(pages.indexOf(page), 1);
		res.sendStatus(204);
	}
});
