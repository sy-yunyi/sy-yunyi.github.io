---
title: 'Into the Dark: Unveiling Internal Site Search Abused for Black Hat SEO'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Mingming Zhang
  - Baojun Liu
  - Zhan Liu
  - Jia Zhang
  - Haixin Duan
  - Min Zhang
  - Fan Shi
  - Chengxi Xu

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2024-08-16'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2024-08-16'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *USENIX Security 2024*
publication_short: In *USENIX Sec'24*

abstract: Internal site Search Abuse Promotion (ISAP) is a prevalent Black Hat Search Engine Optimization (SEO) technique, which exploits the reputation of abused internal search websites with minimal effort. However, ISAP is underappreciated and not systematically understood by the security community. To shed light on ISAP risks, we established a collaboration with Baidu, a leading search engine in China. The key challenge of efficiently detecting ISAP risks stems from the sheer volume of daily search traffic, which involves billions of URLs. To address these efficiency bottlenecks, we introduced a first-of-its-kind lightweight detector utilizing a funnel-like approach, tailored to the unique characteristics of ISAP. This approach allows us to single out 3,222,864 ISAP URLs from 10,209 abused websites from Baidu's traffic data. We found that the businesses most likely to fall prey to this practice are porn and gambling, with two emerging areas self-promotion for SEO and promotion for anonymous servers. By analyzing Baidu's search logs, we discovered that these malicious websites had reached millions of users in just 4 days. We further evaluated this threat on Google and Bing, thereby confirming the widespread presence of ISAP across various search engines. Moreover, we responsibly disclosed the issue to affected search engines and websites, and actively helped them fix it. In summary, our findings highlight the widespread impact and prevalence of ISAP, emphasizing the urgent need for the security community to prioritize and address such risks.



# Summary. An optional shortened abstract.
summary: Internal site Search Abuse Promotion (ISAP) is a prevalent Black Hat Search Engine Optimization (SEO) technique, which exploits the reputation of abused internal search websites with minimal effort.  To shed light on ISAP risks, we established a collaboration with Baidu, a leading search engine in China..

tags:
  - Black Hat SEO, ISAP

# Display this page in the Featured widget?
featured: false

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://www.usenix.org/system/files/usenixsecurity24-zhang-yunyi-dark.pdf'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: 'https://www.usenix.org/system/files/usenixsecurity24_slides-zhang-yunyi-dark.pdf'
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#   focal_point: ''
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

{{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/).
