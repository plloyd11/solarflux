const htmlmin = require('html-minifier');

module.exports = eleventyConfig => {
    // Nunjuck filters
    eleventyConfig.addFilter('categoryStyle', require('./filters/categoryStyle.js'));
    eleventyConfig.addFilter('encodeUri', require('./filters/encodeUri.js'));
    eleventyConfig.addFilter('dateDisplay', require('./filters/dates.js'));
    eleventyConfig.addFilter('htmlDateDisplay', require('./filters/timestamp.js'));

    // Minify our HTML
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // Collections
    eleventyConfig.addCollection('blog', collection => {
        const blogs = collection.getFilteredByTag('blog');

        for (let i = 0; i < blogs.length; i++) {
            const prevPost = blogs[i - 1];
            const nextPost = blogs[i + 1];

            blogs[i].data['prevPost'] = prevPost;
            blogs[i].data['nextPost'] = nextPost;
        }

        return blogs.reverse();
    });

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
    eleventyConfig.addLayoutAlias('clean', 'layouts/clean.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    // Include our static assets
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('robots.txt');
    eleventyConfig.addPassthroughCopy({ 'static/admin': 'admin' });

    return {
        templateFormats: ['html', 'md', 'njk'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    };
};
