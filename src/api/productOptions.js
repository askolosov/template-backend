import resource from 'resource-router-middleware';

export default ({ config, models: { productOptions }, productOptionValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'productOption',

	load(req, id, callback) {
		productOptions.queries.findOne(id).then(_ => callback(null, _));
	},

	/** GET / - List all entities */
	index({ params }, res) {
		productOptions.queries.findAll().then(_ => res.json(_));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = productOptionValidator.cast(body);
		productOptions.queries.create(modifiedBody).then(_ => res.json(_));
	},

	/** GET /:id - Return a given entity */
	read({ productOption }, res) {
		res.json(productOption);
	},

	/** PUT /:id - Update a given entity */
	update({ productOption, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				productOption[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ productOption }, res) {
		productOptions.splice(productOptions.indexOf(productOption), 1);
		res.sendStatus(204);
	}
});