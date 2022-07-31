export default {
	kind: "customsearch#search",
	url: {
		type: "application/json",
		template:
			"https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
	},
	queries: {
		request: [
			{
				title: "Google Custom Search - hello",
				totalResults: "35900000",
				searchTerms: "hello",
				count: 10,
				startIndex: 1,
				inputEncoding: "utf8",
				outputEncoding: "utf8",
				safe: "off",
				cx: "a0f9d7c7bd9c69638",
			},
		],
		nextPage: [
			{
				title: "Google Custom Search - hello",
				totalResults: "35900000",
				searchTerms: "hello",
				count: 10,
				startIndex: 11,
				inputEncoding: "utf8",
				outputEncoding: "utf8",
				safe: "off",
				cx: "a0f9d7c7bd9c69638",
			},
		],
	},
	context: {
		title: "Google",
	},
	searchInformation: {
		searchTime: 0.368367,
		formattedSearchTime: "0.37",
		totalResults: "35900000",
		formattedTotalResults: "35,900,000",
	},
	items: [
		{
			kind: "customsearch#result",
			title: "Hello It's Me - YouTube",
			htmlTitle: "<b>Hello</b> It&#39;s Me - YouTube",
			link: "https://www.google.com/sorry/index?continue=https://m.youtube.com/watch%3Fv%3DIfbaUWA32_E&q=EgRC-UAQGLCRl48GIhBIbpR5MROdLPrJTIgIRXKtMgM-PmM",
			displayLink: "www.google.com",
			snippet:
				"Feb 17, 2017 ... Provided to YouTube by Epic/Legacy Hello It's Me · The Isley Brothers Live It Up ℗ 1974 Epic Records, a division of Sony Music Entertainment ...",
			htmlSnippet:
				"Feb 17, 2017 <b>...</b> Provided to YouTube by Epic/Legacy <b>Hello</b> It&#39;s Me · The Isley Brothers Live It Up ℗ 1974 Epic Records, a division of Sony Music Entertainment&nbsp;...",
			formattedUrl:
				"https://www.google.com/sorry/index?continue=https://m.youtube...",
			htmlFormattedUrl:
				"https://www.google.com/sorry/index?continue=https://m.youtube...",
			pagemap: {
				cse_thumbnail: [
					{
						src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7J1ZHZMAr4ZAdmvSXW6hs03G2II0p9oGTV2wXFD9_-XcvEByJ1ghHTuz",
						width: "300",
						height: "168",
					},
				],
				imageobject: [
					{
						width: "1280",
						url: "https://i.ytimg.com/vi/IfbaUWA32_E/maxresdefault.jpg",
						height: "720",
					},
				],
				person: [
					{
						name: "The Isley Brothers - Topic",
						url: "http://www.youtube.com/channel/UC19gd7AQcPkrcFH8w8BYO7w",
					},
				],
				metatags: [
					{
						"og:image": "https://i.ytimg.com/vi/IfbaUWA32_E/maxresdefault.jpg",
						"twitter:app:url:iphone":
							"vnd.youtube://www.youtube.com/watch?v=IfbaUWA32_E&feature=applinks",
						"twitter:app:id:googleplay": "com.google.android.youtube",
						"theme-color": "rgba(255,255,255,0.98)",
						"og:image:width": "1280",
						"twitter:card": "player",
						"og:site_name": "YouTube",
						"twitter:url": "https://www.youtube.com/watch?v=IfbaUWA32_E",
						"twitter:app:url:ipad":
							"vnd.youtube://www.youtube.com/watch?v=IfbaUWA32_E&feature=applinks",
						"al:android:package": "com.google.android.youtube",
						"twitter:app:name:googleplay": "YouTube",
						title: "Hello It's Me",
						"al:ios:url":
							"vnd.youtube://www.youtube.com/watch?v=IfbaUWA32_E&feature=applinks",
						"twitter:app:id:iphone": "544007664",
						"og:description":
							"Provided to YouTube by Epic/LegacyHello It's Me · The Isley BrothersLive It Up℗ 1974 Epic Records, a division of Sony Music EntertainmentReleased on: 1974-09...",
						"al:ios:app_store_id": "544007664",
						"twitter:image":
							"https://i.ytimg.com/vi/IfbaUWA32_E/maxresdefault.jpg",
						"twitter:player": "https://www.youtube.com/embed/IfbaUWA32_E",
						"twitter:player:height": "720",
						"twitter:site": "@youtube",
						"og:video:type": "text/html",
						"og:video:height": "720",
						"og:video:url": "https://www.youtube.com/embed/IfbaUWA32_E",
						"og:type": "video.other",
						"twitter:title": "Hello It's Me",
						"al:ios:app_name": "YouTube",
						"og:title": "Hello It's Me",
						"og:image:height": "720",
						"twitter:app:id:ipad": "544007664",
						"al:web:url":
							"http://www.youtube.com/watch?v=IfbaUWA32_E&feature=applinks",
						"og:video:secure_url": "https://www.youtube.com/embed/IfbaUWA32_E",
						"og:video:tag": "The Isley Brothers",
						"og:video:width": "960",
						"al:android:url":
							"vnd.youtube://www.youtube.com/watch?v=IfbaUWA32_E&feature=applinks",
						"fb:app_id": "87741124305",
						"twitter:app:url:googleplay":
							"https://www.youtube.com/watch?v=IfbaUWA32_E",
						"twitter:app:name:ipad": "YouTube",
						"twitter:description":
							"Provided to YouTube by Epic/LegacyHello It's Me · The Isley BrothersLive It Up℗ 1974 Epic Records, a division of Sony Music EntertainmentReleased on: 1974-09...",
						"og:url": "https://www.youtube.com/watch?v=IfbaUWA32_E",
						"twitter:player:width": "960",
						"al:android:app_name": "YouTube",
						"twitter:app:name:iphone": "YouTube",
					},
				],
				videoobject: [
					{
						embedurl: "https://www.youtube.com/embed/IfbaUWA32_E",
						playertype: "HTML5 Flash",
						isfamilyfriendly: "true",
						uploaddate: "2017-02-17",
						description:
							"Provided to YouTube by Epic/LegacyHello It's Me · The Isley BrothersLive It Up℗ 1974 Epic Records, a division of Sony Music EntertainmentReleased on: 1974-09...",
						videoid: "IfbaUWA32_E",
						url: "https://www.youtube.com/watch?v=IfbaUWA32_E",
						duration: "PT5M33S",
						unlisted: "False",
						name: "Hello It's Me",
						paid: "False",
						width: "960",
						regionsallowed:
							"AE,AR,AS,AT,AU,AW,BA,BE,BG,BH,BM,BO,BR,BY,CA,CH,CL,CO,CR,CY,CZ,DE,DK,DO,DZ,EC,EE,EG,ES,FI,FR,GB,GF,GP,GR,GT,GU,HK,HN,HR,HU,ID,IE,IL,IN,IS,IT,JO,JP,KE,KR,KW,KY,LB,LI,LT,LU,LV,MA,MK,MP,MQ,MT,MX,MY,NC...",
						genre: "Music",
						interactioncount: "9279551",
						channelid: "UC19gd7AQcPkrcFH8w8BYO7w",
						datepublished: "2017-02-17",
						thumbnailurl:
							"https://i.ytimg.com/vi/IfbaUWA32_E/maxresdefault.jpg",
						height: "720",
					},
				],
				cse_image: [
					{
						src: "https://i.ytimg.com/vi/IfbaUWA32_E/maxresdefault.jpg",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title:
				"Kristen Bell, Dax Shepherd launch natural baby line Hello Bello at ...",
			htmlTitle:
				"Kristen Bell, Dax Shepherd launch natural baby line <b>Hello</b> Bello at ...",
			link: "https://www.google.com/appserve/mkt/p/AHANi0Ymd0RfzBGyO52RXE-KqP501v_BoLYCmbEVu3ed4v20GWE73BA0QLKqb5qcBz9DoR95Q01h2oVbSvso5oD-8cb13H7LBY4I0rt03WuEzRSGdt8aq7XNSRjSPMLNWnMvV_1GXgu8JzMgWjK_RBzqLw_Pt7yg2L3TuZb561k0gINDvxroqztwNXjPpSX-PebKodACIQICR-n5-17gWvGpDOBuR3fqxN0",
			displayLink: "www.google.com",
			snippet:
				"Kristen Bell, Dax Shepherd debut Hello Bello at Walmart. Anne Stych, Contributing Writer Feb 26, 2019, 8:41am EST. Kristen Bell, Dax Shepherd launch natural ...",
			htmlSnippet:
				"Kristen Bell, Dax Shepherd debut <b>Hello</b> Bello at Walmart. Anne Stych, Contributing Writer Feb 26, 2019, 8:41am EST. Kristen Bell, Dax Shepherd launch natural&nbsp;...",
			cacheId: "BgPzLVpgcG0J",
			formattedUrl:
				"https://www.google.com/.../AHANi0Ymd0RfzBGyO52RXE-KqP501v_ BoLYCmbEVu3ed4v20GWE73BA0QLKqb5qcBz9DoR95Q01h2oVbSvso...",
			htmlFormattedUrl:
				"https://www.google.com/.../AHANi0Ymd0RfzBGyO52RXE-KqP501v_ BoLYCmbEVu3ed4v20GWE73BA0QLKqb5qcBz9DoR95Q01h2oVbSvso...",
			pagemap: {
				cse_thumbnail: [
					{
						src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTYaipFg6X7EJvAnlLG5damQhGtxnymzGZYNPQ361LKrZ1EErNgLdmbovU",
						width: "299",
						height: "169",
					},
				],
				metatags: [
					{
						date: "2019-02-26T08:41:00-05:00",
						"og:image":
							"https://media.bizj.us/view/img/11231550/hello-bello*1200xx700-395-0-0.jpg",
						"og:image:width": "1200",
						"twitter:card": "summary_large_image",
						"og:site_name": "The Business Journals",
						"og:description":
							".@IMKristenBell and @DasShepherd launch Hello Bell baby wear @Walmart.",
						"og:image:secure_url":
							"https://media.bizj.us/view/img/11231550/hello-bello*1200xx700-395-0-0.jpg",
						"article:publisher": "https://www.facebook.com/bizjournals",
						"publish-date": "Tue, 26 Feb 2019 08:41:00 EST",
						"market:json":
							'{"id":"2661","market_code":"bizjournals","market_name":" The Business Journals","market_abbrev":"The Business Journals","market_color":"sapphire","journal_name":"The Business Journals","twitter":"bizjournals","email":{"AE":null,"ME":null,"BN":null,"BW":4081},"market_state":"NC","market_city":"","mpp_enabled":true,"journal":[]}',
						"cxenseparse:recs:acb-wordcount": "531",
						"tid:legacy": "5151",
						"special-category:json": '{"id":"0","spf":"0"}',
						"cxenseparse:recs:acb-canonical":
							"https://www.bizjournals.com/bizwomen/news/latest-news/2019/02/kristen-bell-dax-shepherd-debut-hello-bello-at.html",
						"fb:pages": "725320624152995",
						"cxenseparse:acb-primarychannel": "Retailing",
						market: "bizjournals",
						breakingnews: "yes",
						"sailthru.image.full":
							"https://media.bizj.us/view/img/11231550/hello-bello*280xx600-402-31-0.jpg",
						"p:domain_verify": "ec0c534b614190f20737f5959d72ae58",
						"msapplication-config": "none",
						"cxenseparse:acb-wordcountgroup": "400 - 549",
						"sailthru.tags":
							"Retailing, Walmart, The Honest Company, Amazon, Dax Shepherd, Jessica Alba, Jennifer Pullen, Sean Kane, Kristen Bell, Jay McGraw, Hello Bello",
						"og:image:type": "image/jpeg",
						y_key: "ba03ff0c1b6c696c",
						"twitter:image":
							"https://media.bizj.us/view/img/11231550/hello-bello*1200xx700-395-0-0.jpg",
						"cxenseparse:recs:acb-headline":
							"Kristen Bell, Dax Shepherd debut Hello Bello at Walmart",
						"pocket-site-verification": "dcfbf8a491ca04e5df334b6a2d30fd",
						"twitter:site": "@bizwomen",
						news_keywords:
							"Retailing, Walmart, The Honest Company, Amazon, Dax Shepherd, Jessica Alba, Jennifer Pullen, Sean Kane, Kristen Bell, Jay McGraw, Hello Bello",
						"sailthru.title":
							"Kristen Bell, Dax Shepherd launch baby line Hello Bello at Walmart",
						"fb:admins":
							"9016348,654914897,628377787,1280002853,763321529,696276440,1155362274",
						"twitter:account_id": "14921083",
						"template:id": "5151",
						"og:type": "article",
						"channel:json":
							'{"id":"12","channel_code":"retailing","channel_name":"Retailing"}',
						"msvalidate.01": "4A4BA4ACEA94A755ED9C4AD1928D6A3E",
						"og:title":
							"Kristen Bell, Dax Shepherd launch natural baby line Hello Bello at Walmart - Bizwomen",
						"metered_paywall:json":
							'{"interval":2592000,"unregistered_limit":"3","light_registered_limit":"5","non_test_market":true,"bypass_domains":"{\\"0\\":\\"https:\\\\\\/\\\\\\/news.yahoo.com\\",\\"1\\":\\"https:\\\\\\/\\\\\\/finance.yahoo.com\\"}"}',
						"og:image:height": "675",
						env: "production",
						"cxenseparse:acb-ispremium": "0",
						"fb:app_id": "122785151074126",
						"sailthru.description":
							"The co-founder and former president of Jessica Alba's Honest Company is CEO of the new company.",
						viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
						"cxenseparse:acb-storytype": "bizwomen",
						"cxenseparse:articleid": "page_21433195",
						"twitter:description":
							"The co-founder and former president of Jessica Alba's Honest Company is CEO of the new company.",
						category:
							"Retailing, Walmart, The Honest Company, Amazon, Dax Shepherd, Jessica Alba, Jennifer Pullen, Sean Kane, Kristen Bell, Jay McGraw, Hello Bello",
						"og:url":
							"https://www.bizjournals.com/bizwomen/news/latest-news/2019/02/kristen-bell-dax-shepherd-debut-hello-bello-at.html?page=all",
					},
				],
				cse_image: [
					{
						src: "https://media.bizj.us/view/img/11231550/hello-bello*1200xx700-395-0-0.jpg",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Hello Google Earth!",
			htmlTitle: "<b>Hello</b> Google Earth!",
			link: "http://www.google.com/earth/plugin/examples/helloearth/index.html",
			displayLink: "www.google.com",
			snippet: "Hello, Earth!",
			htmlSnippet: "<b>Hello</b>, Earth!",
			cacheId: "-fqOqA_cjuMJ",
			formattedUrl:
				"www.google.com/earth/plugin/examples/helloearth/index.html",
			htmlFormattedUrl:
				"www.google.com/earth/plugin/examples/<b>hello</b>earth/index.html",
		},
		{
			kind: "customsearch#result",
			title: "LE HELLO-Groupauto - Google Maps",
			htmlTitle: "LE <b>HELLO</b>-Groupauto - Google Maps",
			link: "https://www.google.com/maps/?cid=7322480251591951916",
			displayLink: "www.google.com",
			snippet:
				"(Translated by Google) Hello Gabriel, Thank you to you for this comment which makes our teams very happy! The feedback from our satisfied customers is ...",
			htmlSnippet:
				"(Translated by Google) <b>Hello</b> Gabriel, Thank you to you for this comment which makes our teams very happy! The feedback from our satisfied customers is&nbsp;...",
			cacheId: "vej3XhT6xAkJ",
			formattedUrl: "https://www.google.com/maps/?cid=7322480251591951916",
			htmlFormattedUrl: "https://www.google.com/maps/?cid=7322480251591951916",
			pagemap: {
				cse_thumbnail: [
					{
						src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgpLF4q3gDvhLhzEGJuBHoJ6KXoEeDErdESPxGzxEj4vPOSZVKZVZAkuk-",
						width: "225",
						height: "225",
					},
				],
				metatags: [
					{
						referrer: "origin",
						"og:image":
							"https://lh5.googleusercontent.com/p/AF1QipOfjtYFGgsYWFVBSYo16SEag3mZUNU2WdOV2NW8=w256-h256-k-no-p",
						"og:image:width": "256",
						"twitter:card": "summary",
						"og:site_name":
							"LE HELLO-Groupauto · 1 Rue de la Gibaudiére, 49124 Saint-Barthélemy-d'Anjou, France",
						viewport:
							"initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
						"og:title":
							"LE HELLO-Groupauto · 1 Rue de la Gibaudiére, 49124 Saint-Barthélemy-d'Anjou, France",
						"og:image:height": "256",
						google: "notranslate",
						"og:description": "★★★★★ · Auto parts store",
					},
				],
				place: [
					{
						image:
							"https://lh5.googleusercontent.com/p/AF1QipOfjtYFGgsYWFVBSYo16SEag3mZUNU2WdOV2NW8=w256-h256-k-no-p",
						name: "LE HELLO-Groupauto · 1 Rue de la Gibaudiére, 49124 Saint-Barthélemy-d'Anjou, France",
						description: "★★★★★ · Auto parts store",
					},
				],
				cse_image: [
					{
						src: "https://lh5.googleusercontent.com/p/AF1QipOfjtYFGgsYWFVBSYo16SEag3mZUNU2WdOV2NW8=w256-h256-k-no-p",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title:
				"Public Employment Security Office (Hello Work Omagari) - Google ...",
			htmlTitle:
				"Public Employment Security Office (<b>Hello</b> Work Omagari) - Google ...",
			link: "https://www.google.com/maps/?cid=9929085586696749969",
			displayLink: "www.google.com",
			snippet:
				"(Translated by Google) To everyone who will receive unemployment allowance from now on. Please be careful of young newcomers, the staff mistakenly processed ...",
			htmlSnippet:
				"(Translated by Google) To everyone who will receive unemployment allowance from now on. Please be careful of young newcomers, the staff mistakenly processed&nbsp;...",
			cacheId: "YJ5Naazg4OoJ",
			formattedUrl: "https://www.google.com/maps/?cid=9929085586696749969",
			htmlFormattedUrl: "https://www.google.com/maps/?cid=9929085586696749969",
			pagemap: {
				metatags: [
					{
						referrer: "origin",
						"og:image":
							"https://lh5.googleusercontent.com/p/AF1QipNS2iYF2uaAfZhYR2WBWYdaZiIqmjlQ4esL4LJo=w256-h256-k-no-p",
						"og:image:width": "256",
						"twitter:card": "summary",
						"og:site_name":
							"Public Employment Security Office (Hello Work Omagari) · 2-33 Omagarisumiyoshicho, Daisen, Akita 014-0034, Japan",
						viewport:
							"initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
						"og:title":
							"Public Employment Security Office (Hello Work Omagari) · 2-33 Omagarisumiyoshicho, Daisen, Akita 014-0034, Japan",
						"og:image:height": "256",
						google: "notranslate",
						"og:description": "★★☆☆☆ · Unemployment office",
					},
				],
				place: [
					{
						image:
							"https://lh5.googleusercontent.com/p/AF1QipNS2iYF2uaAfZhYR2WBWYdaZiIqmjlQ4esL4LJo=w256-h256-k-no-p",
						name: "Public Employment Security Office (Hello Work Omagari) · 2-33 Omagarisumiyoshicho, Daisen, Akita 014-0034, Japan",
						description: "★★☆☆☆ · Unemployment office",
					},
				],
				cse_image: [
					{
						src: "https://lh5.googleusercontent.com/p/AF1QipNS2iYF2uaAfZhYR2WBWYdaZiIqmjlQ4esL4LJo=w256-h256-k-no-p",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Say Hello and Introduce Yourself - Google Public Data Explorer",
			htmlTitle:
				"Say <b>Hello</b> and Introduce Yourself - Google Public Data Explorer",
			link: "https://www.google.com/publicdata/explore?ds=ene89huqop5hk_&hl=en&dl=en#!ctype=m&strail=true&bcs=o&nselm=h&ifdim=location&tdim=true&hl=en_US&dl=en_US&ind=false",
			displayLink: "www.google.com",
			snippet:
				"No data available for Abu Dhabi, Beijing, Bratislava and 12 others. Public Data. Say Hello and Introduce Yourself ? Posts. Clear. Compare by. Locations.",
			htmlSnippet:
				"No data available for Abu Dhabi, Beijing, Bratislava and 12 others. Public Data. Say <b>Hello</b> and Introduce Yourself ? Posts. Clear. Compare by. Locations.",
			cacheId: "r2TnEJknShQJ",
			formattedUrl: "https://www.google.com/.../explore?ds...",
			htmlFormattedUrl: "https://www.google.com/.../explore?ds...",
			pagemap: {
				metatags: [
					{
						fragment: "!",
						"com.google.dataspaces.frontend.publicview.client.explorepageprodmodule_i18n::gwt:property":
							"baseUrl=/publicdata/gwt/",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Bernadette Peters Demonstrates Her Physically Demanding Pre ...",
			htmlTitle:
				"Bernadette Peters Demonstrates Her Physically Demanding Pre ...",
			link: "http://www.google.com/appserve/mkt/p/AIQrb_5qpJjaQpio5LHhSxcFmQM7IgnOV28QsUgh7BKsnbY9LhwhKWkQIcYJ33VZEi2hKzaCuXcN-BvlA-SdlodbGPz6hycExHiifBWkBO3wGB5wvfCXRIMjSMXmj7RtKe0z5-T37dATYQs9Av5Y-YcjJRcvnif14H4JbjYELDOvd5i6V66Or--wIom3mY2bikA5gg_cTmoTLDLA1mWK8siIXw7xKA",
			displayLink: "www.google.com",
			snippet:
				"Tony winner Bernadette Peters and Victor Garber joined the hosts of The View March 13 to talk about their return to Broadway in Hello, Dolly!",
			htmlSnippet:
				"Tony winner Bernadette Peters and Victor Garber joined the hosts of The View March 13 to talk about their return to Broadway in <b>Hello</b>, Dolly!",
			cacheId: "6kZKQe6UGA0J",
			formattedUrl:
				"www.google.com/.../AIQrb_ 5qpJjaQpio5LHhSxcFmQM7IgnOV28QsUgh7BKsnbY9LhwhKWkQIcYJ3...",
			htmlFormattedUrl:
				"www.google.com/.../AIQrb_ 5qpJjaQpio5LHhSxcFmQM7IgnOV28QsUgh7BKsnbY9LhwhKWkQIcYJ3...",
			pagemap: {
				cse_thumbnail: [
					{
						src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRid8LMAXdE5vbrVc3CmNRyE-bEWWImQblan6z56tjNRWpK4w0hYywKPsOx",
						width: "299",
						height: "169",
					},
				],
				metatags: [
					{
						"og:image":
							"https://assets.playbill.com/editorial/_1200x630_crop_center-center_82_none/58acd626678c292c51f47f3ef8f688a8-screen-shot-2018-03-13-at-12.25.31 PM.png?mtime=1552405868",
						"fb:profile_id": "playbill",
						"og:type": "website",
						"twitter:card": "summary_large_image",
						"twitter:title":
							"Bernadette Peters Demonstrates Her Physically Demanding Pre-Show Hello, Dolly! Ritual",
						"og:site_name": "Playbill",
						"og:title":
							"Bernadette Peters Demonstrates Her Physically Demanding Pre-Show Hello, Dolly! Ritual",
						"og:description":
							"Watch what the Tony winner does with the ensemble before each performance.",
						"twitter:creator": "@playbill",
						"twitter:image":
							"https://assets.playbill.com/editorial/_1200x630_crop_center-center_82_none/58acd626678c292c51f47f3ef8f688a8-screen-shot-2018-03-13-at-12.25.31 PM.png?mtime=1552405868",
						referrer: "no-referrer-when-downgrade",
						"twitter:site": "@playbill",
						viewport: "width=device-width, initial-scale=1",
						"twitter:description":
							"Watch what the Tony winner does with the ensemble before each performance.",
						"og:locale": "en_US",
						"og:url":
							"https://playbill.com/article/bernadette-peters-demonstrates-her-physically-demanding-pre-show-hello-dolly-ritual",
					},
				],
				cse_image: [
					{
						src: "https://assets.playbill.com/editorial/58acd626678c292c51f47f3ef8f688a8-screen-shot-2018-03-13-at-12.25.31%20PM.png",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Hello Modas - Google Maps",
			htmlTitle: "<b>Hello</b> Modas - Google Maps",
			link: "https://www.google.com/maps/?cid=7220040686915434998",
			displayLink: "www.google.com",
			snippet:
				"Hello Modas. ·No reviews. Permanently closed ·. Overview. Photos. Directions. Save. Nearby. Send to your phone. Share. Rua João Vagnotti, 271 - Centro, ...",
			htmlSnippet:
				"<b>Hello</b> Modas. ·No reviews. Permanently closed ·. Overview. Photos. Directions. Save. Nearby. Send to your phone. Share. Rua João Vagnotti, 271 - Centro,&nbsp;...",
			cacheId: "UzacjZL66mEJ",
			formattedUrl: "https://www.google.com/maps/?cid=7220040686915434998",
			htmlFormattedUrl: "https://www.google.com/maps/?cid=7220040686915434998",
			pagemap: {
				metatags: [
					{
						referrer: "origin",
						"og:image":
							"//geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&output=tile&panoid=9EII67ej86AAAAQulFW2Qw&x=0&y=0&zoom=2",
						"og:image:width": "256",
						"twitter:card": "summary",
						"og:site_name":
							"Hello Modas · Rua João Vagnotti, 271 - Centro, Itaquaquecetuba - SP, 08570-220, Brazil",
						viewport:
							"initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
						"og:title":
							"Hello Modas · Rua João Vagnotti, 271 - Centro, Itaquaquecetuba - SP, 08570-220, Brazil",
						"og:image:height": "256",
						google: "notranslate",
						"og:description": "Women's clothing store",
					},
				],
				place: [
					{
						image:
							"//geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&output=tile&panoid=9EII67ej86AAAAQulFW2Qw&x=0&y=0&zoom=2",
						name: "Hello Modas · Rua João Vagnotti, 271 - Centro, Itaquaquecetuba - SP, 08570-220, Brazil",
						description: "Women's clothing store",
					},
				],
				cse_image: [
					{
						src: "//geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&output=tile&panoid=9EII67ej86AAAAQulFW2Qw&x=0&y=0&zoom=2",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Hello Cabs Perth - Taxi in Perth - Google Maps",
			htmlTitle: "<b>Hello</b> Cabs Perth - Taxi in Perth - Google Maps",
			link: "https://www.google.com/maps/?cid=16026317138747293747",
			displayLink: "www.google.com",
			snippet:
				"On our next trip to we wont even think about other solution for taxi ! Great Service Hello Cabs Perth, I will recommend you to everybody that goes to Perth !",
			htmlSnippet:
				"On our next trip to we wont even think about other solution for taxi ! Great Service <b>Hello</b> Cabs Perth, I will recommend you to everybody that goes to Perth !",
			cacheId: "eglU5v6whNEJ",
			formattedUrl: "https://www.google.com/maps/?cid=16026317138747293747",
			htmlFormattedUrl: "https://www.google.com/maps/?cid=16026317138747293747",
			pagemap: {
				metatags: [
					{
						referrer: "origin",
						"og:image":
							"https://lh5.googleusercontent.com/p/AF1QipPcwrSKF2mwbyioiMFMhqeieRD3jMEP4-rT_Izo=w256-h256-k-no-p",
						"og:image:width": "256",
						"twitter:card": "summary",
						"og:site_name":
							"Hello Cabs Perth - Taxi in Perth · 44C Wolya Way, Westminster WA 6061, Australia",
						viewport:
							"initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
						"og:title":
							"Hello Cabs Perth - Taxi in Perth · 44C Wolya Way, Westminster WA 6061, Australia",
						"og:image:height": "256",
						google: "notranslate",
						"og:description": "★★★★★ · Taxi service",
					},
				],
				place: [
					{
						image:
							"https://lh5.googleusercontent.com/p/AF1QipPcwrSKF2mwbyioiMFMhqeieRD3jMEP4-rT_Izo=w256-h256-k-no-p",
						name: "Hello Cabs Perth - Taxi in Perth · 44C Wolya Way, Westminster WA 6061, Australia",
						description: "★★★★★ · Taxi service",
					},
				],
				cse_image: [
					{
						src: "https://lh5.googleusercontent.com/p/AF1QipPcwrSKF2mwbyioiMFMhqeieRD3jMEP4-rT_Izo=w256-h256-k-no-p",
					},
				],
			},
		},
		{
			kind: "customsearch#result",
			title: "Google",
			htmlTitle: "Google",
			link: "https://www.google.com/",
			displayLink: "www.google.com",
			snippet:
				"Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking ...",
			htmlSnippet:
				"Search the world&#39;s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you&#39;re looking&nbsp;...",
			cacheId: "y14FcUQOGl4J",
			formattedUrl: "https://www.google.com/",
			htmlFormattedUrl: "https://www.google.com/",
			pagemap: {
				cse_thumbnail: [
					{
						src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT3X9ZpkcNrr2kAcGZuXPZTNiK1oeTXhRMCZ1UGxNLf-an4du0eriX01mc",
						width: "320",
						height: "112",
					},
				],
				metatags: [
					{
						referrer: "origin",
						viewport: "width=device-width,minimum-scale=1.0",
						google: "notranslate",
						"format-detection": "telephone=no",
					},
				],
				cse_image: [
					{
						src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
					},
				],
			},
		},
	],
};
