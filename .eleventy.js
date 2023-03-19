const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
// https://github.com/11ty/eleventy/issues/2301
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);

	// https://github.com/11ty/eleventy/issues/2301
	const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };
  const markdownLib = markdownIt(mdOptions)
    .use(markdownItAttrs)
    .disable("code");

  eleventyConfig.setLibrary("md", markdownLib);


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

	eleventyConfig.addCollection("categories", function (collectionApi) {
		let categories = new Set();
		let posts = collectionApi.getFilteredByTag('post');
		posts.forEach(p => {
			let cats = p.data.categories;
			cats.forEach(c => categories.add(c));
		});
		return Array.from(categories);
	});

	eleventyConfig.addFilter("filterByCategory", function (posts, cat) {
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

	const english = new Intl.DateTimeFormat("en");
	eleventyConfig.addFilter("niceDate", function (d) {
		return english.format(d);
	});

	eleventyConfig.addPassthroughCopy("src/_data/*");
	eleventyConfig.addPassthroughCopy("src/favicon/*");
	eleventyConfig.addPassthroughCopy("src/assets/css/*");
	eleventyConfig.addPassthroughCopy("src/assets/js/*");
	eleventyConfig.addPassthroughCopy("src/assets/sass/*");
	eleventyConfig.addPassthroughCopy("src/assets/webfonts/*");
	// Images folders, assumes cascading folders per year
	eleventyConfig.addPassthroughCopy("src/images/*");	
	eleventyConfig.addPassthroughCopy("src/images/2023/*.jpg");	

	return {
		dir: {
			input: 'src',
			output: "_site",
		}
	}

};