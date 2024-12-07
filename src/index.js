// @ts-check

import view from '@fastify/view';
import pug from 'pug';
import formbody from '@fastify/formbody';
import yup from 'yup';
import { generateId } from './utils.js';

export default async (app, _options) => {
    const articles = [];

    await app.register(view, { engine: { pug } });
    await app.register(formbody);

    app.get('/', (req, res) => res.view('src/views/index'));

    app.get('/articles', (req, res) => {
        res.view('src/views/articles/index', { articles });
    });

    app.post('/articles', {
        attachValidation: true,
        schema: {
            body: yup.object({
                title: yup.string().min(2, 'Название не должно быть короче двух символов'),
                text: yup.string().min(10, 'Статья должна быть не короче 10 символов'),
            }),
        },
        validatorCompiler: ({ schema }) => (data) => {
            if (articles.some((article) => article.title === data.title)) {
                return {
                    error: Error('Статья с таким названием уже существует'),
                };
            }
            try {
                const result = schema.validateSync(data);
                return { value: result };
            } catch (e) {
                return { error: e };
            }
        },
    }, (req, res) => {
        const { title, text } = req.body;
        if (req.validationError) {
            return res.code(422).view('src/views/articles/new', { title, text, error: req.validationError });
        }
        articles.push({ id: generateId(), title, text });
        return res.redirect('/articles');
    });

    app.get('/articles/new', (req, res) => res.view('src/views/articles/new'));

    app.get('/articles/:id', (req, res) => {
        const article = articles.find(({ id }) => id === req.params.id);

        if (!article) {
            return res.status(404).send('article not found');
        }

        return res.view('src/views/articles/show', { article });
    });

    return app;
};
