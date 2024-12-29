import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import { generateCategoryPages } from 'eleventy-generate-category-pages';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import pluginDate from 'eleventy-plugin-date';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginStats from 'eleventy-plugin-post-stats';

// local plugins
import pluginImages from './eleventy.config.images.js';
import htmlMinTransform from './src/transforms/html-min.js';

// Create a helpful production flag
const isProduction = process.env.RUNTIME_ENV === 'production';

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginImages, { debugMode: false });
	eleventyConfig.addPlugin(pluginDate);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginStats);

	// https://github.com/11ty/eleventy/issues/2301
	const mdOptions = {
		html: true,
		breaks: true,
		linkify: true,
	};
	const markdownLib = markdownIt(mdOptions)
		.use(markdownItAttrs)
		.disable('code');

	eleventyConfig.setLibrary('md', markdownLib);

	var firstRun = true;
	eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
		if (firstRun) {
			firstRun = false;
			generateCategoryPages({}, true, false);
		}
	});

	// From ray camden's blog, first paragraph as excerpt
	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));
	function extractExcerpt(post) {
		if (!post.templateContent) return '';
		if (post.templateContent.indexOf('</p>') > 0) {
			let end = post.templateContent.indexOf('</p>');
			return post.templateContent.substr(0, end + 4);
		}
		return post.templateContent;
	}

	eleventyConfig.addCollection('categories', function (collectionApi) {
		let categories = new Set();
		let posts = collectionApi.getFilteredByTag('post');
		posts.forEach(p => {
			let cats = p.data.categories;
			cats.forEach(c => categories.add(c));
		});
		return Array.from(categories);
	});

	eleventyConfig.addFilter('filterByCategory', function (posts, cat) {
		// case matters, so let's lowercase the desired category, cat	and we will 
		// lowercase our posts categories as well
		cat = cat.toLowerCase();
		let result = posts.filter(p => {
			let cats = p.data.categories.map(s => s.toLowerCase());
			return cats.includes(cat);
		});
		return result;
	});

	// https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify
	// Remove <code>.*</code>, remove HTML, then with plain text, limit to 5k chars
	eleventyConfig.addFilter('algExcerpt', function (text) {
		//first remove code
		text = text.replace(/<code class="language-.*?">.*?<\/code>/sg, '');
		//now remove html tags
		text = text.replace(/<.*?>/g, '');
		//now limit to 5k
		return text.substring(0, 5000);
	});

	eleventyConfig.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	eleventyConfig.addFilter('commaize', function (num) {
		return parseFloat(num).toLocaleString('en-us');
	});

	// https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/
	// Copy the favicon files to the root folder
	eleventyConfig.addPassthroughCopy({ 'src/favicon/*': '/' });
	eleventyConfig.addPassthroughCopy('src/_data/*');
	eleventyConfig.addPassthroughCopy('src/assets/*');
	eleventyConfig.addPassthroughCopy('src/assets/css/*');
	eleventyConfig.addPassthroughCopy('src/assets/js/*');
	eleventyConfig.addPassthroughCopy('src/assets/sass/*');
	eleventyConfig.addPassthroughCopy('src/assets/webfonts/*');
	eleventyConfig.addPassthroughCopy('src/images/');

	// Only minify HTML if we are in production because it slows builds
	if (isProduction) {
		eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	}

	return {
		dir: {
			input: 'src',
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data'
		}
	}

};