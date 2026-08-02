/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let collection;

  // --- contact_submissions ---
  collection = new Collection({
    name: 'contact_submissions',
    type: 'base',
    listRule: null,
    viewRule: null,
    createRule: '',
    updateRule: null,
    deleteRule: null,
  });

  collection.fields.add(
    new Field({
      name: 'name',
      type: 'text',
      required: true,
      min: 1,
      max: 120,
    })
  );
  collection.fields.add(
    new Field({
      name: 'email',
      type: 'email',
      required: true,
    })
  );
  collection.fields.add(
    new Field({
      name: 'message',
      type: 'text',
      required: true,
      min: 1,
      max: 5000,
    })
  );

  app.save(collection);

  // --- bookings ---
  collection = new Collection({
    name: 'bookings',
    type: 'base',
    listRule: null,
    viewRule: null,
    createRule: '',
    updateRule: null,
    deleteRule: null,
  });

  collection.fields.add(
    new Field({
      name: 'name',
      type: 'text',
      required: true,
      min: 1,
      max: 120,
    })
  );
  collection.fields.add(
    new Field({
      name: 'email',
      type: 'email',
      required: true,
    })
  );
  collection.fields.add(
    new Field({
      name: 'date',
      type: 'date',
      required: true,
    })
  );
  collection.fields.add(
    new Field({
      name: 'time',
      type: 'text',
      required: true,
      min: 1,
      max: 16,
    })
  );

  app.save(collection);
}, (app) => {
  try {
    const c1 = app.findCollectionByNameOrId('contact_submissions');
    app.delete(c1);
  } catch (e) {}
  try {
    const c2 = app.findCollectionByNameOrId('bookings');
    app.delete(c2);
  } catch (e) {}
});
